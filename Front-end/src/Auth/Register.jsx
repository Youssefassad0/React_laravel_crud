/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/Login.css";
import "../assets/loading.css";

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  async function register(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let item = { name, email, password };
      let response = await fetch("http://localhost:8001/api/register", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Registration failed. Please try again later.");
      }

      // Parse the response as JSON
      let result = await response.json();
      localStorage.setItem("user-info", JSON.stringify(result));

      // Assuming successful registration, redirect to login page after a delay
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.error("Error during registration:", error.message);
      alert("Registration failed. Please try again later.");
    }
  }

  return (
    <section>
      <div className="signin">
        <div className="content">
          <h2>Sign Up</h2>
          {loading && (
            <div className="terminal-loader">
              <div className="terminal-header">
                <div className="terminal-title">Status</div>
                <div className="terminal-controls">
                  <div className="control close"></div>
                  <div className="control minimize"></div>
                  <div className="control maximize"></div>
                </div>
              </div>
              <div className="text">Loading...</div>
            </div>
          )}
          <div className="form">
            <div className="inputBox">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
              />
              {/* {errors.name && <div className="error">{errors.name[0]}</div>} */}
            </div>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {/* {errors.email && <div className="error">{errors.email[0]}</div>} */}
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {/* {errors.password && ( */}
              {/* // <div className="error">{errors.password[0]}</div> */}
              {/* )} */}
            </div>
            <div className="links">
              <Link to="/login">Already have an account? Login</Link>
            </div>
            <div className="inputBox">
              <input
                type="submit"
                onClick={register}
                value="Sign Up"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
