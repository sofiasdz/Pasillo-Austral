import React from 'react';
import './Home.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Calendar } from '../../components/Calendar/Calendar';
import { PostCard } from '../../components/PostCard/PostCard';
import { Label } from '../../components/Label/Label';
import { Button } from '../../components/Button/Button';
import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';
import plusIcon from '../../assets/plus-icon.svg';

const Home: React.FC = () => {
  // Calendar data
  const weekDays = ['LUn', 'mar', 'mar', 'Mie', 'Jue', 'Vie', 'SAB', 'Dom'];
  const weeks = [
    [
      { day: 1, isActive: true },
      { day: 2 },
      { day: 3 },
      { day: 4, hasEvents: 2 },
      { day: 5 },
      { day: 6 },
      { day: 7 },
    ],
    [
      { day: 8 },
      { day: 9 },
      { day: 10, hasEvents: 1 },
      { day: 11 },
      { day: 12 },
      { day: 13 },
      { day: 14 },
    ],
    [
      { day: 15 },
      { day: 16, hasEvents: 3 },
      { day: 17 },
      { day: 18 },
      { day: 19 },
      { day: 20 },
      { day: 21 },
    ],
    [
      { day: 22 },
      { day: 23 },
      { day: 24 },
      { day: 25 },
      { day: 26 },
      { day: 28 },
      { day: 0 },
    ],
  ];

  const calendarEvents = [
    { date: '4 Ene', title: 'Final mesa extraordinaria Análisis matematico' },
    { date: '4 Ene', title: 'Final mesa extraordinaria Algebra II' },
    { date: '10 Ene', title: 'Primer Parcial Investigación Operativa' },
    { date: '16 Ene', title: 'Segundo Parcial Investigación Operativa' },
  ];

  return (
    <div className="home">
      <TopBar username="@Khali_1998" avatar={avatar1} />
      <Sidebar activeItem="Home" />

      <div className="home__calendar">
        <Calendar
          month="Enero"
          year={2025}
          weeks={weeks}
          weekDays={weekDays}
          events={calendarEvents}
        />
      </div>

      <div className="home__main">
        <div className="home__header">
          <Label variant="primary">Ultimas Publicaciones</Label>
          <button className="home__new-post-button">
            <img src={plusIcon} alt="" className="home__new-post-icon" />
            <span className="home__new-post-text">Nueva Publicación</span>
          </button>
        </div>

        <div className="home__posts">
          <PostCard
            topic="Programación I"
            userAvatar={avatar1}
            username="@Khali_1998"
            date="10 November 2025 19:35"
            title="¿Cuándo conviene usar bucles y cuándo recursividad?"
            content={
              <>
                <p style={{ marginBottom: 0 }}>
                  Hola a todos, estoy repasando conceptos básicos y me surgió esta duda.
                  <br aria-hidden="true" />
                  {` Entiendo que con un for o while puedo repetir instrucciones fácilmente, pero en varios ejemplos de libros usan recursividad para resolver problemas que también se pueden hacer con bucles (por ejemplo, calcular factorial o recorrer un árbol).`}
                </p>
                <p>
                  Mi pregunta es:
                  <br aria-hidden="true" />
                  {` 1. ¿Qué criterio usan ustedes para decidir entre bucles y recursividad?`}
                  <br aria-hidden="true" />
                  {` 2. ¿Es solo una cuestión de estilo o hay ventajas reales de uno sobre el otro?`}
                </p>
              </>
            }
            tags={['Algebra', 'Duda', 'Ingenieria']}
          />

          <PostCard
            topic="Programación I"
            userAvatar={avatar2}
            username="@Lis_2003"
            date="10 Octubre 2025 14:35"
            title="¿Cómo saber cuándo conviene separar el código en diferentes objetos o clases?"
            content={
              <>
                <p style={{ marginBottom: 0 }}>
                  Estoy aprendiendo programación orientada a objetos y a veces me cuesta decidir cuándo debería crear una nueva clase o si conviene mantener todo dentro de una misma.
                </p>
                <p style={{ marginBottom: 0 }}>
                  Por ejemplo, si tengo una app que maneja usuarios, pedidos y productos, ¿cómo sé hasta qué punto dividir en clases?
                  <br aria-hidden="true" />
                  {` ¿Existe alguna guía o principio general (como SRP o SOLID) que ayude a decidir?`}
                </p>
                <p>
                  También me pasa que a veces termino con clases muy pequeñas que apenas tienen una función, y no sé si eso está bien o si es un exceso de división.
                  <br aria-hidden="true" />
                  {` ¿Cómo equilibran ustedes la claridad y la simplicidad cuando diseñan objetos?`}
                </p>
              </>
            }
            tags={['Programación', 'Recursividad']}
          />

          <PostCard
            topic="Algebra I"
            userAvatar={avatar3}
            username="@JuaniK20"
            date="12 November 2025 19:35"
            title="Diferencia entre base ortogonal y ortonormal"
            content="En clase vimos ejemplos, pero en la práctica me confundo porque no sé cuándo una base es ortogonal pero no ortonormal, y qué hacer para pasar de una a otra. Si me dan un conjunto de vectores, ¿cómo sé si es ortonormal? ¿y cómo la "
            tags={['Algebra', 'Duda', 'Ingenieria']}
          />

          <PostCard
            topic="Física I"
            userAvatar={avatar1}
            username="@Sofisdz"
            date="10 November 2025 19:35"
            title="Choques elásticos"
            content="No me queda claro cómo aplicar conservación de la energía y de la cantidad de movimiento en choques "
            tags={['Física I', 'Duda', 'Ingenieria']}
            className="post-card--variant-roboto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

