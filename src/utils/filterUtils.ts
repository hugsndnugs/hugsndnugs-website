import type { Project, FilterState } from '../types/project';

export function filterProjects(projects: Project[], filters: FilterState): Project[] {
  let filtered = [...projects];

  // Search by name or description
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      project =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
  }

  // Filter by language
  if (filters.selectedLanguage) {
    filtered = filtered.filter(project => project.language === filters.selectedLanguage);
  }

  // Filter by topic
  if (filters.selectedTopic) {
    filtered = filtered.filter(project => project.topics.includes(filters.selectedTopic!));
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'stars':
        return b.stars - a.stars;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      default:
        return 0;
    }
  });

  return filtered;
}

export function getUniqueLanguages(projects: Project[]): string[] {
  const languages = new Set<string>();
  projects.forEach(project => {
    if (project.language) {
      languages.add(project.language);
    }
  });
  return Array.from(languages).sort();
}

export function getUniqueTopics(projects: Project[]): string[] {
  const topics = new Set<string>();
  projects.forEach(project => {
    project.topics.forEach(topic => topics.add(topic));
  });
  return Array.from(topics).sort();
}
