import pLimit from "p-limit";
import pRetry from "p-retry";

export const batchOptions = {
  concurrency: undefined,     // Max concurrent requests (default: 2)
  retries: undefined,         // Max retry attempts for rate limit errors (default: 7)
  minTimeout: undefined,      // Initial retry delay in ms (default: 2000)
  maxTimeout: undefined,      // Max retry delay in ms (default: 128000)
  onProgress: undefined,      // Callback for progress updates
};

/**
 * Check if an error is likely a rate limit or quota violation.
 * Useful for custom error handling if needed.
 */
export function isRateLimitError(error) {
  const errorMsg = error instanceof Error ? error.message : String(error);
  return (
    errorMsg.includes("429") ||
    errorMsg.includes("RATELIMIT_EXCEEDED") ||
    errorMsg.toLowerCase().includes("quota") ||
    errorMsg.toLowerCase().includes("rate limit")
  );
}

/**
 * Process items in batches with concurrency limit and automatic retries on rate limits.
 *
 * @param {any[]} items - Array of items to process
 * @param {Function} processor - Async function that processes one item
 * @param {Object} [options={}] - Concurrency and retry settings
 * @returns {Promise<any[]>} Array of results (in the same order as input)
 *
 * @example
 * const categorized = await batchProcess(
 *   csvRows,
 *   async (row) => {
 *     const response = await openai.chat.completions.create({
 *       model: "gpt-4o",
 *       messages: [{ role: "user", content: `Categorize: ${row.name}` }],
 *     });
 *     return { ...row, category: JSON.parse(response.choices[0]?.message?.content || "{}") };
 *   },
 *   { concurrency: 3, retries: 5 }
 * );
 */
export async function batchProcess(items, processor, options = {}) {
  const {
    concurrency = 2,
    retries = 7,
    minTimeout = 2000,
    maxTimeout = 128000,
    onProgress,
  } = options;

  const limit = pLimit(concurrency);
  let completed = 0;

  const promises = items.map((item, index) =>
    limit(() =>
      pRetry(
        async () => {
          try {
            const result = await processor(item, index);
            completed++;
            onProgress?.(completed, items.length, item);
            return result;
          } catch (error) {
            if (isRateLimitError(error)) {
              throw error; // let p-retry handle it
            }
            // Non-rate-limit errors → abort retry
            throw new pRetry.AbortError(
              error instanceof Error ? error : new Error(String(error))
            );
          }
        },
        { retries, minTimeout, maxTimeout, factor: 2 }
      )
    )
  );

  return Promise.all(promises);
}

/**
 * Process items **sequentially** and send real-time progress via SSE / callback.
 * Useful when you want to stream progress to the frontend.
 *
 * @param {any[]} items - Array of items
 * @param {Function} processor - Async function that processes one item
 * @param {Function} sendEvent - Function that sends progress events (SSE, websocket, etc.)
 * @param {Object} [options={}] - Retry settings only (concurrency is fixed to 1)
 * @returns {Promise<any[]>} Array of results (undefined for failed items)
 */
export async function batchProcessWithSSE(items, processor, sendEvent, options = {}) {
  const { retries = 5, minTimeout = 1000, maxTimeout = 15000 } = options;

  sendEvent?.({ type: "started", total: items.length });

  const results = [];
  let errors = 0;

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    sendEvent?.({ type: "processing", index, item });

    try {
      const result = await pRetry(
        () => processor(item, index),
        {
          retries,
          minTimeout,
          maxTimeout,
          factor: 2,
          onFailedAttempt: (error) => {
            if (!isRateLimitError(error)) {
              throw new pRetry.AbortError(
                error instanceof Error ? error : new Error(String(error))
              );
            }
          },
        }
      );
      results.push(result);
      sendEvent?.({ type: "progress", index, result });
    } catch (error) {
      errors++;
      results.push(undefined);
      sendEvent?.({
        type: "progress",
        index,
        error: error instanceof Error ? error.message : "Processing failed",
      });
    }
  }

  sendEvent?.({ type: "complete", processed: items.length, errors });
  return results;
}