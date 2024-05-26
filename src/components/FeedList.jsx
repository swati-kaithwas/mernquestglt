import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedItem from './FeedItem';
import PieChart from './PieChart';
import Header from './Header';

const FeedList = () => {
  const [feeds, setFeeds] = useState([]);
  const [filteredFeeds, setFilteredFeeds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/feeds')
      .then(response => {
        setFeeds(response.data);
        setFilteredFeeds(response.data);
      })
      .catch(error => console.error('Error fetching feeds:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = feeds.filter(feed => {
      const title = feed.title ? feed.title.toLowerCase() : '';
      const content = feed.content ? feed.content.toLowerCase() : '';
      return title.includes(lowercasedTerm) || content.includes(lowercasedTerm);
    });
    setFilteredFeeds(filtered);
  };

  const handleLike = (id) => {
    const updatedFeeds = feeds?.map(feed => {
      if (feed.id === id) {
        const userLiked = feed.likedBy.includes("current_user");
        const updatedLikedBy = userLiked 
          ? feed.likedBy.filter(user => user !== "current_user")
          : [...feed.likedBy, "current_user"];
        return { ...feed, likes: feed.likes + (userLiked ? -1 : 1), likedBy: updatedLikedBy };
      }
      return feed;
    });
    setFeeds(updatedFeeds);
    setFilteredFeeds(updatedFeeds);
  };

  const handleComment = (id, comments) => {
    const updatedFeeds = feeds.map(feed => {
      if (feed.id === id) {
        return { ...feed, comments: [...comments] }; // Update feed's comments with the updated comments
      }
      return feed;
    });
    setFeeds(updatedFeeds);
    setFilteredFeeds(updatedFeeds);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto p-4 flex flex-cols gap-[50px]">
        {filteredFeeds.map(feed => (
          <FeedItem key={feed.id} feed={feed} onLike={handleLike} onComment={handleComment} />
        ))}
        <PieChart feeds={filteredFeeds} />
      </div>
    </div>
  );
};

export default FeedList;
