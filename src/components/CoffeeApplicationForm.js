import React, { useState } from 'react';
import './CoffeeApplicationForm.css';

const CoffeeApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    skills: '',
    address: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const positions = [
    'barista',
    'waiter',
    'supplier',
    'manager',
    'kitchen',
    'other'
  ];

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

  const handlePositionSelect = (position) => {
    setFormData(prev => ({
      ...prev,
      position: position
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // MB
      if (fileSize > 5) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
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

      case 'age':
        const age = parseInt(value);
        if (!value) return 'Age cannot be empty.';
        if (age < 16) return 'Must be at least 16 years old.';
        if (age > 100) return 'Please enter a valid age.';
        return '';

      case 'email':
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!value.trim()) return 'Email cannot be empty.';
        if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number cannot be empty.';
        if (value.length < 10) return 'Phone number must be at least 10 digits.';
        return '';

      case 'position':
        if (!value) return 'Please select a position!';
        return '';

      default:
        return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors = {};
    let hasErrors = false;

    const requiredFields = ['name', 'age', 'email', 'phone', 'position'];
    requiredFields.forEach(field => {
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
    alert(`${formData.name} you have successfully applied. Will get back to you.`);
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      skills: '',
      address: ''
    });
    setSelectedFile(null);
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
              Join our <span className="brown-color">coffee</span> family.<br />
              Brew your future with us.
            </h2>
          </div>
          
          <div className="black-bottom-line">
            <h2 className="horizon-align">
              Tell us about <span className="brown-color">yourself</span>
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
              <label htmlFor="age" className="label-name">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="70"
                style={{ paddingLeft: '120px' }}
                required
              />
            </div>
            {errors.age && <div className="error">{errors.age}</div>}
            
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
              What <span className="brown-color">position</span> interests you?
            </h2>
            <div className="position-options">
              {positions.map(position => (
                <div
                  key={position}
                  className={`position-option ${formData.position === position ? 'selected' : ''}`}
                  onClick={() => handlePositionSelect(position)}
                >
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </div>
              ))}
            </div>
            {errors.position && <div className="error">{errors.position}</div>}
          </div>
          
          <div className="black-bottom-line">
            <h2 className="horizon-align">
              Your <span className="brown-color">experience</span> matters
            </h2>
            <div className="full-width-input">
              <label htmlFor="experience" className="label-name">Previous Experience:</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about your relevant work experience..."
              />
            </div>
            <div className="full-width-input">
              <label htmlFor="skills" className="label-name">Skills & Certifications:</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows="3"
                placeholder="Coffee brewing, customer service, food safety, etc..."
              />
            </div>
          </div>
          
          <div className="black-bottom-line">
            <h2 className="horizon-align">
              Let's see your <span className="brown-color">face</span>
            </h2>
            <div className="full-width-input">
              <label htmlFor="imagePic" className="label-name">Profile Picture:</label>
              <div className="file-upload" onClick={() => document.getElementById('imagePic').click()}>
                <input
                  type="file"
                  id="imagePic"
                  name="pic"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                {selectedFile ? (
                  <div>
                    <p>✅ {selectedFile.name} uploaded successfully!</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      File size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Drop your pic here.</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      JPG, PNG, or GIF (Max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="black-bottom-line">
            <h2 className="horizon-align">
              Where can we <span className="brown-color">find</span> you?
            </h2>
            <div className="full-width-input">
              <label htmlFor="address" className="label-name">Address:</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Your full address..."
              />
            </div>
          </div>
          
          <div className="horizon-align" style={{ padding: '20px' }}>
            <h2>Ready to brew?</h2>
            <button type="submit" className="submit-btn">SUBMIT APPLICATION</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CoffeeApplicationForm;
