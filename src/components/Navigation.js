import React from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, onPageChange }) => {
  return (
    <nav>
      <div className="brand-txt">CoffeeCo</div>
      <div className="nav-links">
        <button 
          className={`nav-button ${currentPage === 'home' ? 'current' : ''}`}
          onClick={() => onPageChange('home')}
        >
          Home
        </button>
        <button 
          className={`nav-button ${currentPage === 'reserve' ? 'current' : ''}`}
          onClick={() => onPageChange('reserve')}
        >
          Reserve
        </button>
        <button 
          className={`nav-button ${currentPage === 'apply' ? 'current' : ''}`}
          onClick={() => onPageChange('apply')}
        >
          Apply
        </button>
        <button 
          className={`nav-button ${currentPage === 'order' ? 'current' : ''}`}
          onClick={() => onPageChange('order')}
        >
          Order
        </button>
        <button 
          className={`nav-button ${currentPage === 'order' ? 'current' : ''}`}
          onClick={() => window.location.href='bcatt.vercel.app'}
        >
          Order
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
