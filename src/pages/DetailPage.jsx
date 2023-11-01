import React, { useState, useEffect } from 'react';
import CommentList from '../components/CommentList/CommentList';

function DetailPage({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error('Failed');
        }
      
        const data = await response.json();
        setComments(data);
        setLoading(false);
      } 
      catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  return (
    <CommentList comments={comments}/>
  );
}

export default DetailPage;
