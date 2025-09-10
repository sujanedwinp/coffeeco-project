import React, { useState } from 'react';
import './CoffeeReserveForm.css';

const CoffeeReserveForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Process input based on field type
    if (name === 'name') {
      processedValue = value.replace(/\d/g, ''); // Remove digits
    } else if (name === 'phone') {
      processedValue = value.replace(/\D/g, ''); // Keep only digits
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        const onlyLetters = /^[A-Za-z\s]+$/;
        if (!value.trim()) return 'Name cannot be empty.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters long.';
        if (!onlyLetters.test(value.trim())) return 'Only letters and spaces allowed!';
        return '';

      case 'email':
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!value.trim()) return 'Email cannot be empty.';
        if (!emailPattern.test(value.trim())) return 'Please enter a valid email.';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number cannot be empty.';
        if (value.length !== 10) return 'Phone number must be exactly 10 digits.';
        return '';

      case 'date':
        if (!value) return 'Date cannot be empty.';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectDate = new Date(value);
        if (selectDate < today) return 'Back to the future, aint possible.';
        return '';

      case 'time':
        if (!value) return 'Time cannot be empty.';
        return '';

      default:
        return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, show success message
    alert(`${formData.name}, your reservation is Confirmed!`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: ''
    });
    setErrors({});
  };

  return (
    <main className="main">
      <div className="form-bg">
        <header className="center brown-color black-bottom-line">
          <h1>CoffeeCo</h1>
        </header>
        
        <form onSubmit={handleSubmit}>
          <div className="black-bottom-line horizon-align">
            <h2 style={{ fontSize: '28px' }}>
              Life is toooooo short to enjoy <span className="brown-color">coffee</span>.<br />
              Have one today.
            </h2>
          </div>
          
          <div className="black-bottom-line">
            <h2 className="horizon-align">
              Har coffee pe likha hain peene vaale ka <span className="brown-color">naam</span>.
            </h2>
            <div className="inputs-block">
              <label htmlFor="name" className="label-name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.name && <div className="error">{errors.name}</div>}
            
            <div className="inputs-block">
              <label htmlFor="email" className="label-name">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}
            
            <div className="inputs-block">
              <label htmlFor="phone" className="label-name">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
          
          <div className="black-bottom-line">
            <h2 className="horizon-align">
              So when's the sacrifice of the <span className="brown-color">bean</span>?
            </h2>
            <div className="inputs-block">
              <label htmlFor="date" className="label-name">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{ width: '180px' }}
                required
              />
            </div>
            {errors.date && <div className="error">{errors.date}</div>}
            
            <div className="inputs-block">
              <label htmlFor="time" className="label-name">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={{ width: '180px' }}
                required
              />
            </div>
            {errors.time && <div className="error">{errors.time}</div>}
          </div>
          
          <div className="horizon-align" style={{ padding: '2px' }}>
            <h2>Done?</h2>
            <button type="submit" className="submit-btn">KEEP IT HOT</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CoffeeReserveForm;
