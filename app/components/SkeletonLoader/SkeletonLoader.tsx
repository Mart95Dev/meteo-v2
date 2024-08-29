import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="weather-box skeleton-loading">
      <div className="country-flag skeleton-element"></div>
      <div className="country-name skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
      <div className="capital-name skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
      <div className="weather-type skeleton-element"></div>
      <div className="weather-icon skeleton-element"></div>
      <div className="temperature-label skeleton-element">
        <span className="skeleton-text"></span>
      </div>
      <div className="real-feel skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
      <div className="feels-like skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
      <div className="climate-label skeleton-element">
        <span className="skeleton-text"></span>
      </div>
      <div className="rain skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
      <div className="wind skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
      <div className="humidity skeleton-element">
        <span className="skeleton-text"></span>
        <span className="skeleton-text"></span>
      </div>
    </div>
  );
};

export default SkeletonLoader;