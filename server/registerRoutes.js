import axios from "axios";

async function searchGithubCandidates(skills) {
  const query = skills.join(" ");
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`;

  const response = await axios.get(url);

  return response.data.items.map(user => ({
    name: user.login,
    role: "GitHub Developer",
    company: user.type,
    skills: skills,
    profileUrl: user.html_url,
    platform: "GitHub",
    relevanceScore: Math.round(user.score * 10),
  }));
}
export { searchGithubCandidates };
