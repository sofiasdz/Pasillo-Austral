import React from 'react';
import './Topics.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Filter } from '../../components/Filter/Filter';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import avatar1 from '../../assets/avatar1.png';
import topic1 from '../../assets/topic1.jpg';
import topic2 from '../../assets/topic2.jpg';
import topic3 from '../../assets/topic3.jpg';
import topic4 from '../../assets/topic4.jpg';
import topic5 from '../../assets/topic5.jpg';
import topic6 from '../../assets/topic6.jpg';

const Topics: React.FC = () => {
  const topics = [
    {
      id: 1,
      image: topic1,
      name: 'Análisis Matematico I',
      description: 'Lugar para debatir problemas, teoremas y demostraciones, así como para compartir estrategias de resolución y materiales recomendados por docentes y ayudantes.',
      members: 150,
      fontVariant: 'manrope' as const,
    },
    {
      id: 2,
      image: topic2,
      name: 'Programación I',
      description: 'Comunidad dedicada a consultas técnicas, intercambio de código, explicación de algoritmos y discusión de buenas prácticas en lenguajes...',
      members: 210,
      fontVariant: 'roboto' as const,
    },
    {
      id: 3,
      image: topic3,
      name: 'Algebra I',
      description: 'Espacio para resolver dudas, compartir ejercicios y discutir conceptos clave de álgebra lineal y matemática discreta. Ideal para coordinar grupos de estudio y acceder a....',
      members: 103,
      fontVariant: 'roboto' as const,
    },
    {
      id: 4,
      image: topic4,
      name: 'Química I',
      description: 'Espacio para compartir dudas, explicaciones y recursos sobre teoría y práctica de la química, desde lo básico hasta temas avanzados de reacciones, compuestos y procesos.',
      members: 150,
      fontVariant: 'manrope' as const,
    },
    {
      id: 5,
      image: topic5,
      name: 'Física I',
      description: 'Un lugar de encuentro para quienes buscan comprender mejor los principios de la física y su aplicación en el mundo real. Se pueden plantear problemas, intercambiar métodos de resolución y discutir...',
      members: 210,
      fontVariant: 'roboto' as const,
    },
    {
      id: 6,
      image: topic6,
      name: 'General',
      description: 'Este espacio está pensado para que toda la comunidad de la Facultad pueda conectar, compartir e informarse. ',
      members: 103,
      fontVariant: 'roboto' as const,
    },
  ];

  const handleBack = () => {
    // Navigate back - can be implemented with routing later
    window.history.back();
  };

  return (
    <div className="topics">
      <TopBar username="@Khali_1998" avatar={avatar1} />
      <Sidebar activeItem="Temas" />

      <div className="topics__content">
        <div className="topics__header-wrapper">
          <Header title="Temas" onBack={handleBack} />
        </div>

        <div className="topics__filter-wrapper">
          <Filter label="Popular" />
        </div>

        <div className="topics__grid">
          <div className="topics__row">
            {topics.slice(0, 3).map((topic) => (
              <TopicCard
                key={topic.id}
                image={topic.image}
                name={topic.name}
                description={topic.description}
                members={topic.members}
                className={topic.fontVariant === 'roboto' ? 'topic-card--variant-roboto' : ''}
              />
            ))}
          </div>
          <div className="topics__row">
            {topics.slice(3).map((topic) => (
              <TopicCard
                key={topic.id}
                image={topic.image}
                name={topic.name}
                description={topic.description}
                members={topic.members}
                className={topic.fontVariant === 'roboto' ? 'topic-card--variant-roboto' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;

