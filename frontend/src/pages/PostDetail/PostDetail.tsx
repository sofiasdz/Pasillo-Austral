import React, { useState, useEffect } from 'react';
import './PostDetail.css';
import { Header } from '../../components/Header/Header';
import { PostCard } from '../../components/PostCard/PostCard';
import { AnswerBox } from '../../components/AnswerBox/AnswerBox';
import { Comment, type CommentData } from '../../components/Comment/Comment';
import { RelatedWidget } from '../../components/RelatedWidget/RelatedWidget';
import { MaterialWidget } from '../../components/MaterialWidget/MaterialWidget';
import avatar1 from '../../assets/avatar1.png';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch post data
        const postRes = await fetch(`${API_URL}/posts/${id}`);
        if (!postRes.ok) throw new Error("Error fetching post");
        const postData = await postRes.json();

        // 2. Fetch comments for this post
        const commentsRes = await fetch(`${API_URL}/comments/post/${id}`);
        if (!commentsRes.ok) throw new Error("Error fetching comments");
        const commentsData = await commentsRes.json();

        // Set post using UI structure
        setPost({
          ...postData,
          userAvatar: avatar1, // temporal hasta implementar users
          username: postData.user || "@anon",
          date: new Date(postData.createdAt).toLocaleString(),
        });

        // Transform function: backend -> UI component format
        const transform = (c: any): CommentData => ({
          id: c.id,
          userAvatar: avatar1,
          username: c.user || "@anon",
          date: new Date(c.createdAt).toLocaleString(),
          content: c.content,
          likes: c.likes,
          dislikes: c.dislikes,
          replies: commentsData
            .filter((r: any) => r.parentId === c.id)
            .map(transform), // recursion for nested replies
        });

        // Filter to only root comments (no parentId)
        const rootComments = commentsData
          .filter((c: any) => !c.parentId)
          .map(transform);

        setComments(rootComments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePublish = async (text: string, files?: File[]) => {
    if (!text.trim() && (!files || files.length === 0)) return;

    try {
      const formData = new FormData();
      formData.append('postId', id || '');
      formData.append('user', '@anon'); // temporal hasta user real
      formData.append('content', text || '');

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      }

      await fetch(`${API_URL}/comments`, {
        method: 'POST',
        body: formData, // FormData automatically sets Content-Type with boundary
      });

      // refresh comments after publishing
      const commentsRes = await fetch(`${API_URL}/comments/post/${id}`);
      const commentsData = await commentsRes.json();
      setComments(commentsData.filter((c: any) => !c.parentId));
    } catch (err) {
      console.error("Error publishing comment:", err);
    }
  };

  const handleReply = (commentId: string) => {
    console.log('Reply to:', commentId);
  };

  const handleSeeMore = (commentId: string) => {
    console.log('See more replies for:', commentId);
  };

  if (loading || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <div className="post-detail__content">
        <div className="post-detail__header-wrapper">
          <Header title="" onBack={handleBack} />
        </div>

        <div className="post-detail__main">
          <div className="post-detail__post-section">
            <div className="post-detail__post">
              <PostCard
                topic={post.topic}
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
                  { id: '2', title: 'Bucles vs Recursividad: comparativa de rendimiento' },
                ]}
                materials={[
                  { id: '1', name: 'guia_bucles_vs_recursividad.pdf' },
                  { id: '2,', name: 'ejercicios_backtracking.ipynb' },
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


