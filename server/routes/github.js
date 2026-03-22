import express from 'express';

const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'yourusername';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

const githubHeaders = {
  'Accept': 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` }),
};

// GET /api/github/repos - returns pinned/public repos
router.get('/repos', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
      { headers: githubHeaders }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    const filtered = repos
      .filter(r => !r.fork && r.description)
      .map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        topics: r.topics,
        stargazers_count: r.stargazers_count,
        language: r.language,
        updated_at: r.updated_at,
      }));

    res.json({ success: true, repos: filtered });
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({ success: false, error: error.message, repos: [] });
  }
});

// GET /api/github/user - returns user profile
router.get('/user', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers: githubHeaders }
    );

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const user = await response.json();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
