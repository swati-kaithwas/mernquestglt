
import React from 'react';

const Header = ({ onSearch }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Feed</div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-700 p-2 rounded"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="text-gray-300">Profile</button>
          <button className="text-gray-300">Messages</button>
          <button className="text-gray-300">Notifications</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
