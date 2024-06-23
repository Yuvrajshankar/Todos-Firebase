import React from 'react';
import styles from "./sidebar.module.css";
import { sidebarLinks } from './index.js';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    return (
        <section className={styles.section}>
            <div className={styles.links}>
                {sidebarLinks.map((item) => {
                    const isActive = location.pathname === item.route || location.pathname.startsWith(`${item.route}/`);
                    return (
                        <Link
                            to={item.route}
                            key={item.label}
                            className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <img src={item.imgURL} alt={item.label} title={item.label} className={styles.img} />
                            <p className={styles.linkText}>{item.label}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default Sidebar;