import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/PostList/PostList.css';

function FeedListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [visiblePosts, setVisiblePosts] = useState(7);

  useEffect(() => {
    setError(null);
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error(res)
        } else {
          return res.json()
        }
      })
      .then(setPosts)
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [])

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  function formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
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

      <h2>Posts</h2>
      <ul className='list'>
        {posts.slice(0, visiblePosts).map((post) => (
          <li className='list__item' key={post.id}>
            <h3>{formatTitle(post.title)}</h3>
            <p>{formatTitle(post.body)}</p>
            <Link to={`/feeds/${post.id}`} className="detail__link">
              Read More
            </Link>
            
            <button
              className='delete__button'
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visiblePosts < posts.length && (
        <button
          onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 7)} 
          className="show-more-button"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default FeedListPage;
