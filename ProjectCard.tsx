import React from 'react';
import { Project } from '../data/projects';
import './ProjectCard.css';

interface Props {
  project: Project;
  index: number;
  onClick: () => void;
}

const CLIP_PATHS = [
  'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
  'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)',
  'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)',
  'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))',
  'polygon(0 0, 100% 0, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
  'polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
];

const ProjectCard: React.FC<Props> = ({ project, index, onClick }) => {
  const clipPath = CLIP_PATHS[index % CLIP_PATHS.length];

  return (
    <div
      className="card-wrapper"
      onClick={onClick}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      <div className="card-angular" style={{ clipPath }}>
        <div className="card-inner">
          <div className="card-type-badge">{project.type}</div>
          <h3 className="card-title">{project.name}</h3>
          <p className="card-desc">{project.description}</p>
          <div className="card-stack">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="stack-pill">{tech}</span>
            ))}
            {project.stack.length > 3 && (
              <span className="stack-pill muted">+{project.stack.length - 3}</span>
            )}
          </div>
          <div className="card-cta">
            <span>View Project</span>
            <span className="cta-arrow">›</span>
          </div>
        </div>
      </div>
      <div className="card-border-glow" style={{ clipPath }} />
    </div>
  );
};

export default ProjectCard;
