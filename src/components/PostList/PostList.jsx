// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './PostList.css';

// function PostList({ posts, onDeletePost }) {
//   const navigate = useNavigate();
//   const [visiblePosts, setVisiblePosts] = useState(7);

//   const showMorePosts = () => {
//     setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 7);
//   };

//   function formatTitle(title) {
//     return title.charAt(0).toUpperCase() + title.slice(1);
//   }

//   return (
//     <div>
//       <div className="back">
//         <button
//           className="back__button"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//       </div>

//       <h2>Posts</h2>
//       <ul className='list'>
//         {posts.slice(0, visiblePosts).map((post) => (
//           <li className='list__item' key={post.id}>
//             <h3>{formatTitle(post.title)}</h3>
//             <p>{formatTitle(post.body)}</p>
//             <Link to={`/feeds/${post.id}`} className="detail__link">
//               Read More
//             </Link>
            
//             <button
//               className='delete__button'
//               onClick={() => onDeletePost(post.id)}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       {visiblePosts < posts.length && (
//         <button
//           onClick={showMorePosts} 
//           className="show-more-button"
//         >
//           Show More
//         </button>
//       )}
//     </div>
//   );
// }

// export default PostList;
