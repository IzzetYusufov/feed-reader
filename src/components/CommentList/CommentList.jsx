import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentList.css'

function CommentList({ comments }) {
  const [visibleComments, setVisibleComments] = useState(7);
  const navigate = useNavigate();

  function formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  const showMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 7);
  };
  
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
          onClick={showMoreComments} 
          className="show-more-button"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default CommentList;
