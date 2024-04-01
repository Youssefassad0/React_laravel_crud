/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // State to hold form errors

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  }, []); // Empty dependency array ensures this effect runs only once

  async function login(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8001/api/login', { email, password });
      const result = response.data;
      localStorage.setItem('user-info', JSON.stringify(result));
      navigate('/');
    } catch (error) {
      // Handle errors from server response
      if (error.response) {
        if (error.response.status === 422) {
          // Validation errors
          setErrors(error.response.data.errors);
        } else if (error.response.status === 401) {
          // Invalid credentials
          setErrors({ general: "Invalid email or password" });
        } else {
          // Other server errors
          console.error("Server error:", error.response.data.message);
        }
      } else {
        console.error("Request failed:", error.message);
      }
    }
  }

  return (
    <section>
      <div className="signin">
        <div className="content">
          <h2>Log In</h2>
          <div className="form">
            <div className="inputBox">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              <i>Email</i>
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="inputBox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              <i>Password</i>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            {errors.general && <span className="text-danger">{errors.general}</span>}
            <div className="links">
              <Link to="/register">Signup</Link>
            </div>
            <div className="inputBox">
              <input type="submit" onClick={login} value="Login" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
