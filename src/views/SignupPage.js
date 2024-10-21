import React, { useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: name });

      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        email: email,
        displayName: name,
      });

      console.log("User signed up:", userCredential.user);

      onSignup(userCredential.user);

      navigate("/profile");
    } catch (error) {
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="sign">
      <Link to="/" className="link">
        ← Back Home
      </Link>

      <div className="temp">
        <div className="sign-up">
          <h2>
            Welcome to{" "}
            <strong style={{ color: "#bc6c25" }}>Fashion Fusion!!</strong>,
            let's get started
          </h2>
          <h3>Sign Up</h3>
          <form className="signup-form" onSubmit={signup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input type="checkbox" onClick={togglePasswordVisibility} />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#bc6c25" }}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
          <br />
          <div>
            <Link className="login-link" to="/login">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
