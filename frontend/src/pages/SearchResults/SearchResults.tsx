import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { PillTab } from '../../components/PillTab/PillTab';
import { Filter } from '../../components/Filter/Filter';
import { PostCard } from '../../components/PostCard/PostCard';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { FileIcon } from '../../components/FileIcon/FileIcon';
import avatar1 from '../../assets/avatar1.png';
import topic1 from '../../assets/topic1.jpg';
import topic2 from '../../assets/topic2.jpg';
import topic3 from '../../assets/topic3.jpg';
import topic4 from '../../assets/topic4.jpg';
import topic5 from '../../assets/topic5.jpg';
import topic6 from '../../assets/topic6.jpg';
import { useNavigate, useSearchParams } from 'react-router-dom';

const fallbackImages = [topic1, topic2, topic3, topic4, topic5, topic6];

type TabType = 'Publicaciones' | 'Temas' | 'Material de Estudio' | 'Comentarios';

const SearchResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Publicaciones');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();
  const [topics, setTopics] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  const handleBack = () => {
    window.history.back();
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Fetch topics (can be filtered by search query in the future)
    fetch('http://localhost:3001/topics')
      .then((res) => res.json())
      .then((data) => {
        const withImages = data.map((t: any, index: number) => ({
          ...t,
          image: t.image
            ? `/assets/${t.image}`
            : fallbackImages[index % fallbackImages.length],
        }));
        setTopics(withImages);
      })
      .catch((err) => console.error('Error fetching topics:', err));

    // Fetch files (can be filtered by search query in the future)
    // For now, using mock data similar to Topic page
    setFiles([
      { id: '1', name: 'resumen_algebra_lineal.pdf', fileType: 'pdf', downloadUrl: '#' },
      { id: '2', name: 'guia_ejercicios_vectores.docx', fileType: 'docx', downloadUrl: '#' },
      { id: '3', name: 'matrices_y_determinantes_resuelto.pdf', fileType: 'pdf', downloadUrl: '#' },
      { id: '4', name: 'ejercicios_espacios_vectoriales.xlsx', fileType: 'xlsx', downloadUrl: '#' },
      { id: '5', name: 'formulario_algebra_lineal.pdf', fileType: 'pdf', downloadUrl: '#' },
      { id: '6', name: 'practica_autovalores_autovectores.docx', fileType: 'docx', downloadUrl: '#' },
      { id: '7', name: 'resumen_transformaciones_lineales.pdf', fileType: 'pdf', downloadUrl: '#' },
      { id: '8', name: 'ejercicios_sistemas_ecuaciones.pdf', fileType: 'pdf', downloadUrl: '#' },
      { id: '9', name: 'guia_practica_matrices_inversas.pdf', fileType: 'pdf', downloadUrl: '#' },
      { id: '10', name: 'ejercicios_producto_interno.docx', fileType: 'docx', downloadUrl: '#' },
      { id: '11', name: 'tree-trunk.png', fileType: 'png', downloadUrl: '#' },
    ]);
  }, []);

  const goToTopic = (id: number | string) => {
    navigate(`/topic/${id}`);
  };

  return (
    <div className="search-results">
      <TopBar 
        username="@Khali_1998" 
        avatar={avatar1}
        searchQuery={searchQuery}
        searchPlaceholder="Buscar"
      />

      <Sidebar activeItem="Home" />

      <div className="search-results__content">
        <div className="search-results__header-wrapper">
          <Header title="Resultados de búsqueda" onBack={handleBack} />
        </div>

        <div className="search-results__tabs-wrapper">
          <div className="search-results__tabs">
            <PillTab
              label="Publicaciones"
              active={activeTab === 'Publicaciones'}
              onClick={() => handleTabChange('Publicaciones')}
            />
            <PillTab
              label="Temas"
              active={activeTab === 'Temas'}
              onClick={() => handleTabChange('Temas')}
            />
            <PillTab
              label="Material de Estudio"
              active={activeTab === 'Material de Estudio'}
              onClick={() => handleTabChange('Material de Estudio')}
            />
            <PillTab
              label="Comentarios"
              active={activeTab === 'Comentarios'}
              onClick={() => handleTabChange('Comentarios')}
            />
          </div>
        </div>

        <div className="search-results__filter-wrapper">
          <Filter label="Popular" />
        </div>

        <div className="search-results__main">
          {activeTab === 'Publicaciones' && (
            <div className="search-results__posts">
              {/* TODO: Fetch and display posts based on search query */}
              <PostCard
                topic="Algebra I"
                userAvatar={avatar1}
                username="Khali_1998"
                date="10 November 2025 19:35"
                title="Problema con cambio de base en espacios vectoriales"
                content="Hola! Estoy intentando resolver un ejercicio donde me piden expresar un vector en una base distinta a la canónica. Entiendo el concepto de cambio de base, pero me pierdo en la práctica: Tengo un vector en ℝ³ escrito en la base canónica, y me dan una base B = {(1,1,0), (0,1,1), (1,0,1)}. ¿Cómo hago exactamente para encontrar ..."
                tags={['Algebra', 'Duda', 'Ingenieria']}
                showMoreLink={false}
              />
              <PostCard
                topic="Algebra I"
                userAvatar={avatar1}
                username="JuaniK20"
                date="12 November 2025 19:35"
                title="Duda con diagonalización de matrices"
                content="Buenas! Estoy practicando diagonalización y me trabé con una matriz que tiene un autovalor repetido. El autovalor λ = 2 tiene multiplicidad algebraica 2, pero cuando saco los autovectores solo encuentro uno. ¿Esto significa que la matriz no es diagonalizable? ¿O estoy calculando mal el espacio propio? Si no fuera diagonalizable..."
                tags={['Algebra', 'Duda', 'Ingenieria']}
                showMoreLink={false}
              />
            </div>
          )}

          {activeTab === 'Temas' && (
            <div className="search-results__topics">
              <div className="search-results__topics-grid">
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    image={topic.image}
                    name={topic.title}
                    description={topic.description}
                    members={topic.membersCount}
                    onClick={() => goToTopic(topic.id)}
                    className=""
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Material de Estudio' && (
            <div className="search-results__material">
              <div className="search-results__files-list">
                {files.map((file) => (
                  <FileIcon
                    key={file.id}
                    name={file.name}
                    fileType={file.fileType}
                    downloadUrl={file.downloadUrl}
                    onDownload={() => console.log(`Download ${file.name}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Comentarios' && (
            <div className="search-results__comments">
              {/* TODO: Display comments based on search query */}
              <p>Comentarios content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

