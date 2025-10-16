import { Project } from '@/types/project';
import { mockProjects } from '@/fixtures/projectData';

const PROJECTS_KEY = 'estatevisio-projects';

// Load projects from localStorage
export const loadProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) {
      const projects = JSON.parse(stored);
      // Convert date strings back to Date objects
      return projects.map((project: any) => ({
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
      }));
    }
  } catch (error) {
    console.error('Failed to load projects from localStorage:', error);
  }
  return [];
};

// Save projects to localStorage
export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save projects to localStorage:', error);
  }
};

// Add a new project
export const addProject = (project: Project): void => {
  const projects = loadProjects();
  projects.push(project);
  saveProjects(projects);
};

// Update an existing project
export const updateProject = (projectId: string, updates: Partial<Project>): void => {
  const projects = loadProjects();
  const index = projects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date(),
    };
    saveProjects(projects);
  }
};

// Get a specific project by ID
export const getProject = (projectId: string): Project | undefined => {
  const projects = loadProjects();
  return projects.find(p => p.id === projectId);
};

// Delete a project
export const deleteProject = (projectId: string): void => {
  const projects = loadProjects();
  const filtered = projects.filter(p => p.id !== projectId);
  saveProjects(filtered);
};

// Clear all projects
export const clearProjects = (): void => {
  localStorage.removeItem(PROJECTS_KEY);
};

// Get all projects (mock + cached)
export const getAllProjects = (): Project[] => {
  const cachedProjects = loadProjects();
  return [...mockProjects, ...cachedProjects];
};

// Get a project from either mock or cached data
export const getProjectFromAll = (projectId: string): Project | undefined => {
  const cachedProject = getProject(projectId);
  if (cachedProject) return cachedProject;
  
  return mockProjects.find(p => p.id === projectId);
};
