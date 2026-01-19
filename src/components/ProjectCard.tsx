import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {project.name}
          </h3>
          {project.language && (
            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap">
              {project.language}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Topics/Tags */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 5 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{project.topics.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center mr-4">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 .25a.75.75 0 01.673.418l3.058 6.197 6.839.994a.75.75 0 01.416 1.279l-4.948 4.823 1.168 6.811a.75.75 0 01-1.088.791L12 18.347l-6.118 3.216a.75.75 0 01-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 01.416-1.28l6.84-.993L11.327.668A.75.75 0 0112 .25zm0 2.445L9.44 7.882a.75.75 0 01-.564.41l-5.725.832 4.143 4.038a.75.75 0 01.214.664l-.978 5.702 5.12-2.692a.75.75 0 01.698 0l5.12 2.692-.978-5.702a.75.75 0 01.214-.664l4.143-4.038-5.725-.831a.75.75 0 01-.564-.41L12 2.694v.001z" />
            </svg>
            <span>{project.stars}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Updated {formatDate(project.updatedAt)}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Repository
          </a>
          {project.pagesUrl && (
            <a
              href={project.pagesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
