import React from 'react';
import styles from "./view.module.css";

function View({ title, description }) {
    return (
        <div className={styles.viewContainer}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default View;