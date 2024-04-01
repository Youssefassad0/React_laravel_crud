/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
useEffect(()=>{
  if(!localStorage.getItem('user-info')){
    navigate('/login'); }
},[])
  const clearErrors = () => {
    setErrors({});
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8001/api/users", {
        name: name,
        email: email,
        password: password,
      });
      // Clear errors upon successful submission
      clearErrors();
      // Redirect to home page
      navigate("/");
      console.log("User added successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Set errors received from the server
        setErrors(error.response.data.errors);
      } else {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Name of user
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="fullName"
            placeholder="Full Name"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>
        <button type="submit" onClick={addUser} className="btn btn-primary">
          Add user
        </button>
      </form>
    </div>
  );
}

export default App;
