import React from 'react';
import styles from "./auth.module.css";
import AuthForm from '../../components/Form/AuthForm';

function Auth() {
    return (
        <div className={styles.auth}>
          <AuthForm />
        </div>
    )
}

export default Auth
