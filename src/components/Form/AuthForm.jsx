import React, { useState } from 'react';
import styles from "./AuthForm.module.css";
import Login from './Login';
import Register from './Register';
import google from "../../assets/google.svg";
import { signInWithGoogle } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/authreducer';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                dispatch(login({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                }));
                navigate('/');
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className={styles.formContainer}>

            {isLogin ? <Login /> : <Register />}

            <p className={styles.tra}>{isLogin ? "Don't have an account?" : "Already on Todos?"} <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create" : "Sign in"}</span></p>

            {/* OR */}
            <div className={styles.line}>
                <span className={styles.orText}>Or</span>
            </div>

            {/* Login With Google */}
            <button className={styles.googleButton} onClick={handleGoogle}>
                <img src={google} alt="google" className={styles.googleIcon} />
                Continue with Google
            </button>

        </div>
    )
}

export default AuthForm
