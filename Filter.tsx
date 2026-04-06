import React from 'react';
import './Filter.css';

interface FilterProps {
  selectedGenre: string;
  selectedTags: string[];
  genres: string[];
  tags: string[];
  onGenreChange: (genre: string) => void;
  onTagChange: (tag: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedGenre, selectedTags, genres, tags, onGenreChange, onTagChange,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-section">
        <span className="filter-label">Genre</span>
        <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)} className="filter-select">
          <option value="all">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="filter-section filter-tags">
        <span className="filter-label">Tags</span>
        <div className="tag-list">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => onTagChange(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
