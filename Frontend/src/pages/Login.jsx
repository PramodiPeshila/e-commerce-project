import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Here you would typically make an API call to authenticate the user
        // For example:
        // const response = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Login attempt:', formData);
        setLoginSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          email: '',
          password: ''
        });
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ submit: 'Login failed. Please check your credentials and try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Log in to your account to continue shopping</p>
        
        {loginSuccess && (
          <div className="success-message">
            Login successful! Redirecting to your account...
          </div>
        )}
        
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
