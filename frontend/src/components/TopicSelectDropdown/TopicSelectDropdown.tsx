import React, { useState, useRef, useEffect } from 'react';
import './TopicSelectDropdown.css';
import chevronDownIcon from '../../assets/chevron-down-icon.svg';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface TopicOption {
  id: string | number;
  name: string;
  image: string;
}

export interface TopicSelectDropdownProps {
  topics: TopicOption[];
  selectedTopic?: TopicOption | null;
  onSelect: (topic: TopicOption) => void;
  placeholder?: string;
}

export const TopicSelectDropdown: React.FC<TopicSelectDropdownProps> = ({
  topics,
  selectedTopic,
  onSelect,
  placeholder = 'Seleccionar tema',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (topic: TopicOption) => {
    onSelect(topic);
    setIsOpen(false);
  };

  const imageUrl = selectedTopic?.image
    ? (selectedTopic.image.startsWith('http')
        ? selectedTopic.image
        : `${API_URL}/assets/${selectedTopic.image}`)
    : null;

  return (
    <div className="topic-select-dropdown" ref={dropdownRef}>
      <button
        className="topic-select-dropdown__button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selectedTopic ? (
          <div className="topic-select-dropdown__selected">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={selectedTopic.name}
                className="topic-select-dropdown__image"
              />
            )}
            <span className="topic-select-dropdown__name">{selectedTopic.name}</span>
          </div>
        ) : (
          <span className="topic-select-dropdown__placeholder">{placeholder}</span>
        )}
        <img
          src={chevronDownIcon}
          alt=""
          className={`topic-select-dropdown__chevron ${isOpen ? 'topic-select-dropdown__chevron--open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="topic-select-dropdown__menu">
          {topics.map((topic) => {
            const topicImageUrl = topic.image
              ? (topic.image.startsWith('http')
                  ? topic.image
                  : `${API_URL}/assets/${topic.image}`)
              : null;

            return (
              <button
                key={topic.id}
                className="topic-select-dropdown__option"
                onClick={() => handleSelect(topic)}
                type="button"
              >
                {topicImageUrl && (
                  <img
                    src={topicImageUrl}
                    alt={topic.name}
                    className="topic-select-dropdown__option-image"
                  />
                )}
                <span className="topic-select-dropdown__option-name">{topic.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicSelectDropdown;

