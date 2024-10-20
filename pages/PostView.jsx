import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPostById, likePost, commentOnPost } from '../utils/api';

const PostView = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const { postId } = router.query; 

  const jwt = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const data = await getPostById(postId, jwt); 
          setPost(data);
        } catch (error) {
          setError('Error al cargar el post.');
        }
      };

      fetchPost();
    }
  }, [postId, jwt]);

  const handleLike = async () => {
    try {
      await likePost(postId, jwt);
      setPost({ ...post, likes: post.likes + 1 }); 
    } catch (error) {
      setError('Error al dar like.');
    }
  };

  const handleComment = async () => {
    try {
      const comment = await commentOnPost(postId, newComment, jwt);
      setPost({ ...post, comments: [...post.comments, comment] });
      setNewComment(''); 
    } catch (error) {
      setError('Error al comentar.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Autor: {post.author}</p>
      <p>Publicado: {new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{post.likes} Likes</p>

      <button onClick={handleLike}>Like</button>

      <div className="comments-section">
        <h3>Comentarios:</h3>
        <ul>
          {post.comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario"
        />
        <button onClick={handleComment}>Comentar</button>
      </div>
    </div>
  );
};

export default PostView;
