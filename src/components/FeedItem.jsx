import React, { useState } from 'react';
import axios from 'axios';

const FeedItem = ({ feed, onLike, onComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        feedId: feed.id,
        username: "current_user",
        userProfilePic: "https://via.placeholder.com/50",
        text: newComment
      };

      // Post new comment to the server
      axios.post(`http://localhost:5001/comments`, comment)
        .then(response => {
          onComment(feed.id, comment);
          setNewComment("");
        })
        .catch(error => console.error('Error posting comment:', error));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <img src={feed.image} alt={feed.title} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{feed.title}</h2>
          <p className="text-gray-600">{feed.publishedDate}</p>
        </div>
      </div>
      <div className="mt-4">
        <img src={feed.image} alt="Feed" className="w-full rounded" />
        <div>{feed.brief}</div>
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={() => onLike(feed.id)} className="text-blue-500">Like ({feed.likes})</button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Comments</h3>
    
        {feed.comments.map((comment, index) => (
          <div key={index} className="flex items-center mt-2">
            <img src={comment.userProfilePic} alt={comment.username} className="w-8 h-8 rounded-full mr-2" />
            <div>
              <p className="font-semibold">{comment.username}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
        <div className="mt-4 flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border rounded-l px-4 py-2 w-full"
            placeholder="Add a comment..."
          />
          <button onClick={handleComment} className="bg-blue-500 text-white rounded-r px-4 py-2">Post</button>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
