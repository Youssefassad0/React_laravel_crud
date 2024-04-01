/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [employe, setEmploye] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("user-info")){
    navigate('/login');
  } 
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8001/api/employes/" + id);
      setEmploye(result.data.user);
    } catch (error) {
      console.log("Error fetchi ng user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploye((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        "http://127.0.0.1:8001/api/updateemploye/" + id,
        employe
      );
      console.log("User updated successfully");
      if (result.data.message) {
        setNotification(result.data.message);
        // Clear errors upon successful submission
        setErrors({});
        // Redirect to home page or any other page upon successful submission
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {notification && (
            <div className="alert alert-success">{notification}</div>
          )}
          <label htmlFor="fullName" className="form-label">
            Name of user
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="name"
            value={employe.name}
            onChange={handleChange}
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
            className="form-control"
            id="email"
            name="email"
            value={employe.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="Phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={employe.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="text-danger">{errors.phone}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="Age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={employe.age}
            onChange={handleChange}
          />
          {errors.age && (
            <div className="text-danger">{errors.age}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="adress" className="form-label">
            Adresse
          </label>
          <input
            type="text"
            className="form-control"
            id="adresse"
            name="adresse"
            value={employe.adresse}
            onChange={handleChange}
          />
          {errors.adresse && (
            <div className="text-danger">{errors.adresse}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Update employe
        </button>
      </form>
    </div>
  );
}

export default Edit;
