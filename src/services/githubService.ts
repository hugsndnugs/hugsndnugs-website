import type { GitHubRepository, Project } from '../types/project';

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: Project[];
  timestamp: number;
}

function getGitHubUsername(): string {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  if (!username) {
    throw new Error('VITE_GITHUB_USERNAME is not set in environment variables');
  }
  return username;
}

function getAuthHeaders(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  return headers;
}

function getFromCache(): Project[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const entry: CacheEntry = JSON.parse(cached);
    const now = Date.now();
    
    if (now - entry.timestamp < CACHE_DURATION) {
      return entry.data;
    }
    
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

function saveToCache(data: Project[]): void {
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore cache errors
  }
}

function transformRepository(repo: GitHubRepository): Project {
  // Generate GitHub Pages URL
  // Format: https://{username}.github.io/{repo-name}/
  let pagesUrl: string | null = null;
  const username = getGitHubUsername();
  
  // Check if repo has homepage that looks like GitHub Pages
  if (repo.homepage && repo.homepage.includes('github.io')) {
    pagesUrl = repo.homepage;
  } else {
    // Assume standard GitHub Pages pattern
    pagesUrl = `https://${username}.github.io/${repo.name}/`;
  }

  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || 'No description available',
    githubUrl: repo.html_url,
    homepageUrl: repo.homepage || null,
    topics: repo.topics || [],
    language: repo.language,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    pagesUrl,
  };
}

async function fetchAllRepositories(username: string): Promise<GitHubRepository[]> {
  const repos: GitHubRepository[] = [];
  let page = 1;
  const perPage = 100;
  let hasMore = true;

  while (hasMore) {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`;
    
    try {
      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User "${username}" not found`);
        }
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Consider setting VITE_GITHUB_TOKEN for higher limits.');
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data: GitHubRepository[] = await response.json();
      
      if (data.length === 0) {
        hasMore = false;
      } else {
        repos.push(...data);
        page++;
        // GitHub API returns at most 100 repos per page
        if (data.length < perPage) {
          hasMore = false;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch repositories');
    }
  }

  return repos;
}

function filterGitHubPagesProjects(repos: GitHubRepository[]): GitHubRepository[] {
  // Filter repositories that likely have GitHub Pages
  // We can't definitively check without additional API calls, so we'll include all repos
  // Users can manually filter or we can check for specific indicators
  // For now, include all repos and let users filter
  return repos;
}

export async function fetchProjects(): Promise<Project[]> {
  // Check cache first
  const cached = getFromCache();
  if (cached) {
    return cached;
  }

  try {
    const username = getGitHubUsername();
    const repos = await fetchAllRepositories(username);
    const filteredRepos = filterGitHubPagesProjects(repos);
    const projects = filteredRepos.map(transformRepository);
    
    // Save to cache
    saveToCache(projects);
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
