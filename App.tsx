import React, { useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import ProjectCard from './components/ProjectCard';
import ProjectPage from './components/ProjectPage';
import { projects } from './data/projects';

function App() {
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const genres = ["System Software", "Full Stack", "Web App", "Game Dev", "CLI Tool", "CLI GUI", "JavaFX", "React", "Node.js", "CMAKE", "JSON", "Streamlit", "OS", "API", "HTML"];
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleGenreChange = (genre: string) => setSelectedGenre(genre);
  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesGenre = selectedGenre === 'all' || project.type === selectedGenre;
    const matchesTags = selectedTags.length
      ? selectedTags.every((tag) => project.tags.includes(tag))
      : true;
    return matchesGenre && matchesTags;
  });

  const activeProject = projects.find((p) => p.name === currentProject);

  if (activeProject) {
    return <ProjectPage project={activeProject} onBack={() => setCurrentProject(null)} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-glow" />
        <h1 className="header-title">
          <span className="title-accent">&lt;</span>
          Khalid Enahora
          <span className="title-accent">/&gt;</span>
        </h1>
        <p className="header-sub">Project Catalog</p>
      </header>

      <Filter
        selectedGenre={selectedGenre}
        selectedTags={selectedTags}
        genres={genres}
        tags={tags}
        onGenreChange={handleGenreChange}
        onTagChange={handleTagChange}
      />

      <div className="project-grid">
        {filteredProjects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            onClick={() => setCurrentProject(project.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;