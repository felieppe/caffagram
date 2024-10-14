import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../utils/api';

const PostView = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { postId } = router.query; 

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const data = await getPostById(postId); 
          setPost(data);
        } catch (error) {
          setError('Error al cargar el post.');
        }
      };

      fetchPost();
    }
  }, [postId]);

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
    </div>
  );
};

export default PostView;
