import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-message">Page not found</p>
        <p className="notfound-description">We couldn't find the page you're looking for.</p>
        <a href="/" className="notfound-home">Go to homepage</a>
      </div>
    </div>
  );
};

export default NotFound;
