import React from 'react';
import './ServerError.css';

const ServerError = ({ retryUrl = '/' }) => {
  return (
    <div className="server-error-container">
      <div className="server-error-card">
        <h1 className="server-error-code">500</h1>
        <p className="server-error-message">Server error</p>
        <p className="server-error-description">Something went wrong on our end. Please try again later.</p>
        <div className="server-error-actions">
          <a className="server-error-btn" href='/'>Retry</a>
          <a className="server-error-home" href="/">Home</a>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
