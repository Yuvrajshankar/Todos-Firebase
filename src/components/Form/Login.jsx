import React, { useState } from 'react';
import styles from "./Form.module.css";
import { signIn } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error signin in:', error);
      setErrorMessage(error.message)
    }
  };

  return (
    <div className={styles.forms}>
      <h2>Sign in</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <form onSubmit={login}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login
