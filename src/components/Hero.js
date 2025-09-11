import React from 'react';
import './Hero.css';

const Hero = ({ onPageChange }) => {
  return (
    <div className="hero-page">
      <div className="hero-header">
        <h1 className="hero-brand-txt">CoffeeCo</h1>
        <i className="hero-tagline">Good Coffee, Great Coffee.</i>
      </div>
      
      <div className="hero-buttons">
        <button 
          className="hero-button"
          onClick={() => onPageChange('reserve')}
        >
          Reserve
        </button>
        <button 
          className="hero-button"
          onClick={() => onPageChange('apply')}
        >
          Apply
        </button>
        <button 
          className="hero-button"
          onClick={() => onPageChange('order')}
        >
          Order
        </button>
        <button 
          className="hero-button"
          onClick={() => window.location.href='https://bcatt.vercel.app/page-navi.html'}
        >
          View Projects
        </button>
      </div>
    </div>
  );
};

export default Hero;
