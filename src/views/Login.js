import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log">
      <Link to="/" className="link">← Back Home</Link>
      <div className="temp">
        <div className="login">
          <h2>
            Welcome to <strong style={{ color: 'var(--accent-color)' }}>Fashion Fushion!!</strong>,
            let's get started
          </h2>
          <h3>Login</h3>
          <form onSubmit={login}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
          <br />
          <div>
            <Link className="signup-link" to="/signup">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
