import React from 'react';
import styles from "./layout.module.css";
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

function Layout({children}) {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');

  return (
    <div className={styles.app}>
        {!isAuthRoute && <Navbar />}
        <div className={styles.main}>
            {!isAuthRoute && <div className={styles.sidebar}><Sidebar /></div>}
            <div className={styles.page}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout;