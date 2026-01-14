import React, { useState, useEffect } from 'react';
import './PostDetail.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { PostCard } from '../../components/PostCard/PostCard';
import { AnswerBox } from '../../components/AnswerBox/AnswerBox';
import { Comment, type CommentData } from '../../components/Comment/Comment';
import { RelatedWidget } from '../../components/RelatedWidget/RelatedWidget';
import { MaterialWidget } from '../../components/MaterialWidget/MaterialWidget';
import avatar1 from '../../assets/avatar1.png';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch post data from API
    // For now, using mock data
    setPost({
      id: id || '1',
      userAvatar: avatar1,
      username: '@Khali_1998',
      date: '10 November 2025 19:35',
      title: '¿Cuándo conviene usar bucles y cuándo recursividad?',
      content: 'Hola a todos, estoy repasando conceptos básicos y me surgió esta duda. Entiendo que con un for o while puedo repetir instrucciones fácilmente, pero en varios ejemplos de libros usan recursividad para resolver problemas que también se pueden hacer con bucles (por ejemplo, calcular factorial o recorrer un árbol). Mi pregunta es: 1. ¿Qué criterio usan ustedes para decidir entre bucles y recursividad? 2. ¿Es solo una cuestión de estilo o hay ventajas reales de uno sobre el otro?',
      tags: ['Programación', 'Duda', 'Ingeniería'],
    });

    // TODO: Fetch comments from API
    // For now, using mock data
    setComments([
      {
        id: '1',
        userAvatar: avatar1,
        username: '@unkind',
        date: '12 November 2020 19:35',
        content: 'Generalmente prefiero bucles para cosas lineales (recorrer listas, repetir cálculos) porque son más fáciles de leer y optimizar.\nLa recursividad brilla en problemas donde la estructura del dato ya es recursiva (árboles, grafos, dividir un problema grande en subproblemas). Ahí el código queda más claro.',
        likes: 256,
        dislikes: 43,
        badge: 'Ayudante',
        badgeColor: '#2f7e0d',
        badgeBgColor: 'rgba(164,214,190,0.2)',
        replies: [
          {
            id: '2',
            userAvatar: avatar1,
            username: '@user2',
            date: '13 November 2020 10:00',
            content: 'Excelente punto sobre los árboles. La recursividad hace el código mucho más elegante ahí.',
            likes: 5,
            dislikes: 0,
          },
        ],
      },
      {
        id: '3',
        userAvatar: avatar1,
        username: '@teacher1',
        date: '12 November 2020 20:15',
        content: 'Desde el punto de vista de rendimiento, los bucles suelen ser más eficientes en términos de memoria (no hay overhead de stack). Pero la recursividad puede ser más intuitiva para ciertos problemas. La clave está en entender cuándo cada uno aporta más claridad.',
        likes: 180,
        dislikes: 20,
        badge: 'Docente',
        badgeColor: '#2f7e0d',
        badgeBgColor: 'rgba(164,214,190,0.2)',
        replies: [],
      },
    ]);

    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePublish = (text: string) => {
    // TODO: Publish comment
    console.log('Publishing comment:', text);
  };

  const handleReply = (commentId: string) => {
    // TODO: Handle reply
    console.log('Replying to comment:', commentId);
  };

  const handleSeeMore = (commentId: string) => {
    // TODO: Navigate to see more replies
    console.log('See more replies for:', commentId);
  };

  if (loading || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <TopBar username="@Khali_1998" avatar={avatar1} />
      <Sidebar activeItem="Home" />

      <div className="post-detail__content">
        <div className="post-detail__header-wrapper">
          <Header title="" onBack={handleBack} />
        </div>

        <div className="post-detail__main">
          <div className="post-detail__post-section">
            <div className="post-detail__post">
              <PostCard
                topic=""
                userAvatar={post.userAvatar}
                username={post.username}
                date={post.date}
                title={post.title}
                content={post.content}
                tags={post.tags}
                showMoreLink={false}
              />
            </div>

            <h2 className="post-detail__answers-title">Respuestas</h2>

            <div className="post-detail__answer-box">
              <AnswerBox
                placeholder="Escribe tu respuesta...."
                onPublish={handlePublish}
                onCancel={() => console.log('Cancel')}
              />
            </div>

            <div className="post-detail__comments">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                  onSeeMore={handleSeeMore}
                />
              ))}
            </div>
          </div>

          <div className="post-detail__sidebar">
            <div className="post-detail__related">
              <RelatedWidget
                posts={[
                  { id: '1', title: '¿Cómo evitar stack overflow al usar recursividad?' },
                  { id: '2', title: 'Bucles vs Recursividad: comparativa de rendimiento en Python y Java' },
                  { id: '3', title: 'Ejemplos prácticos de backtracking explicados paso a paso' },
                ]}
                materials={[
                  { id: '1', name: 'guia_bucles_vs_recursividad.pdf' },
                  { id: '2', name: 'ejercicios_backtracking_practicos.ipynb' },
                  { id: '3', name: 'arboles_binarios_recursivos.py' },
                ]}
              />
            </div>
            <div className="post-detail__material">
              <MaterialWidget
                folders={[
                  { id: '1', name: 'Finales' },
                  { id: '2', name: 'Tps' },
                  { id: '3', name: 'Primer Parcial' },
                  { id: '4', name: 'Segundo Parcial' },
                  { id: '5', name: 'Clases Teóricas' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

