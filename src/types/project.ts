export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  default_branch: string;
}

export interface Project {
  id: number;
  name: string;
  fullName: string;
  description: string;
  githubUrl: string;
  homepageUrl: string | null;
  topics: string[];
  language: string | null;
  stars: number;
  updatedAt: string;
  pagesUrl: string | null;
}

export interface FilterState {
  searchQuery: string;
  selectedLanguage: string | null;
  selectedTopic: string | null;
  sortBy: 'stars' | 'name' | 'updated';
}

export interface ProjectStats {
  totalProjects: number;
  totalStars: number;
  languages: Record<string, number>;
  topics: string[];
}
