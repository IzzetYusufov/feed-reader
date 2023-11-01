import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/CommentList/CommentList.css'

function DetailPage({ postId }) {
  const [visibleComments, setVisibleComments] = useState(7);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json()
        }
      })
      .then(setComments)
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [postId])


  function formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  return (
    <div>
      <div className="back">
        <button
          className="back__button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      <h2>Comments</h2>
      <ul className='comments__list'>
        {comments.slice(0, visibleComments).map((comment) => (
          <li
            className='comments__item'
            key={comment.id}>
              <h4>Email: {comment.email}</h4>
              <h4>Name: {formatTitle(comment.name)}</h4>
              <p>{formatTitle(comment.body)}</p>
            </li>
          ))}
      </ul>
      {visibleComments < comments.length && (
        <button 
          onClick={() => setVisibleComments((prevVisibleComments) => prevVisibleComments + 7)} 
          className="show-more-button"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default DetailPage;
