import React, { useState } from 'react';
import styles from "./Form.module.css";
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../firebase/auth';


function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const register = async (e) => {
        e.preventDefault();
        try {
            await signUp(username, email, password);
            navigate("/")
        } catch (error) {
            console.error('Error signing up:', error);
            setErrorMessage(error.message)
        }
    };

    return (
        <div className={styles.forms}>
            <h2>Create account</h2>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <form onSubmit={register}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Join now</button>
            </form>
        </div>
    )
}

export default Register;
