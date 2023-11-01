import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList/PostList';

function FeedListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsFromApi = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
        if (!response.ok) {
          throw new Error('Failed');
        }
      
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      }
      catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPostsFromApi();
  }, []);

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

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <div>
      <PostList posts={posts} onDeletePost={handleDeletePost} />
    </div>
  );
}

export default FeedListPage;
