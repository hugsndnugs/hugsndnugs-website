import { useState, useEffect } from 'react';
import type { Project } from './types/project';
import { fetchProjects } from './services/githubService';
import Header from './components/Header';
import ProjectList from './components/ProjectList';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load projects';
        setError(message);
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main>
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
              <span className="ml-4 text-gray-700 dark:text-gray-300">Loading projects...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Error Loading Projects
              </h2>
              <p className="text-red-600 dark:text-red-300">{error}</p>
              <p className="mt-4 text-sm text-red-600 dark:text-red-300">
                Make sure you have set VITE_GITHUB_USERNAME in your environment variables.
                See .env.example for configuration details.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <ProjectList projects={projects} />
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No projects found.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
