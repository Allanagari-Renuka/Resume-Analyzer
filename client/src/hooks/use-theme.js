import { useTheme as useNextTheme } from "next-themes";

// Unify theme control with next-themes so the 'dark' class and CSS variables
// are applied consistently across the app.
export function useTheme() {
  const { theme, resolvedTheme, setTheme } = useNextTheme();

  const toggleTheme = () => {
    const current = resolvedTheme === undefined ? theme : resolvedTheme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  return { theme: resolvedTheme ?? theme, toggleTheme };
}
