import React from 'react';
import './RelatedWidget.css';

export interface RelatedPost {
  id: string;
  title: string;
  url?: string;
  onClick?: () => void;
}

export interface RelatedMaterial {
  id: string;
  name: string;
  url?: string;
  onClick?: () => void;
}

export interface RelatedWidgetProps {
  posts?: RelatedPost[];
  materials?: RelatedMaterial[];
  onPostClick?: (post: RelatedPost) => void;
  onMaterialClick?: (material: RelatedMaterial) => void;
}

export const RelatedWidget: React.FC<RelatedWidgetProps> = ({
  posts = [],
  materials = [],
  onPostClick,
  onMaterialClick,
}) => {
  return (
    <div className="related-widget">
      {posts.length > 0 && (
        <div className="related-widget__section">
          <div className="related-widget__header">
            <h3 className="related-widget__title">Posts Relacionados</h3>
            <div className="related-widget__underline"></div>
          </div>
          <div className="related-widget__links">
            {posts.map((post) => (
              <div
                key={post.id}
                className="related-widget__link"
                onClick={() => {
                  onPostClick?.(post);
                  post.onClick?.();
                }}
                role="button"
                tabIndex={0}
              >
                <span className="related-widget__bullet">•</span>
                <p className="related-widget__link-text">{post.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {materials.length > 0 && (
        <div className="related-widget__section">
          <div className="related-widget__header">
            <h3 className="related-widget__title">Material Relacionado</h3>
            <div className="related-widget__underline"></div>
          </div>
          <div className="related-widget__links">
            {materials.map((material) => (
              <div
                key={material.id}
                className="related-widget__link"
                onClick={() => {
                  onMaterialClick?.(material);
                  material.onClick?.();
                }}
                role="button"
                tabIndex={0}
              >
                <span className="related-widget__bullet">•</span>
                <p className="related-widget__link-text">{material.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedWidget;

