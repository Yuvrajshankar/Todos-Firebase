import React, { useState } from 'react';
import styles from "./navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import logout from "../../assets/logout.svg";
import add from "../../assets/add.svg";
import { logOut } from '../../firebase/auth';
import PopupComponent from '../Popup/Popup';
import Create from '../Create/Create';

function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/auth");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    return (
        <nav className={styles.nav}>
            <Link to="/" title='Todos.' style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1px" }}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h1>Todos.</h1>
            </Link>

            <div className={styles.left}>
                <button title='add todo' className={styles.add} onClick={() => setOpen(true)}>
                    <img src={add} alt="add" />
                    <h3>Create</h3>
                </button>
                <button title='Logout' onClick={handleLogOut}>
                    <img src={logout} alt="logout" className={styles.logout} />
                </button>
            </div>

            <PopupComponent isOpen={open} onClose={closeModal}>
                <Create onClose={closeModal} />
            </PopupComponent>
        </nav>
    )
}

export default Navbar
