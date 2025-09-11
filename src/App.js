import React, { useState } from 'react';
// import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CoffeeReserveForm from './components/CoffeeReserveForm';
import CoffeeApplicationForm from './components/CoffeeApplicationForm';
import OrderDiscountPage from './components/OrderDiscountPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onPageChange={handlePageChange} />;
      case 'reserve':
        return <CoffeeReserveForm />;
      case 'apply':
        return <CoffeeApplicationForm />;
      case 'order':
        return <OrderDiscountPage />;
      default:
        return <Hero onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="App">
      {currentPage !== 'home' && (
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      )}
      {renderCurrentPage()}
    </div>
  );
}

export default App;
