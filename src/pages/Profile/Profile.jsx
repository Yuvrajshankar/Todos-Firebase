import React, { useEffect, useState } from 'react';
import styles from "./profile.module.css";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import TodoBox from '../../components/TodoBox/TodoBox';
import { todoData } from '../../Data/todoData';
import PopupComponent from '../../components/Popup/Popup';
import Update from '../../components/Update/Update';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { deleteUserData, getUserData, logOut } from '../../firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/authreducer';
import { clearTodos } from '../../store/reducers/todoreducer';

function Profile() {
    const todos = useSelector(state => state.todos.items);
    const [isUpdateOpen, setUpdateOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const closeUpdateModal = () => setUpdateOpen(false);

    const handleDeleteAccount = async () => {
        try {
            // Delete user data and user account
            await deleteUserData(auth.currentUser);

            // Clear user from Redux store
            dispatch(logout());
            dispatch(clearTodos());
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error as needed
        }
    };

    const filteredTodos = () => {
        switch (filter) {
            case 'All':
                return todos;
            case 'Pending':
                return todos.filter(todo => todo.status === 'pending');
            case 'Completed':
                return todos.filter(todo => todo.status === 'completed');
            case 'Deleted':
                return todos.filter(todo => todo.status === 'deleted');
            default:
                return todos;
        }
    };

    return (
        <div className={styles.container}>
            {user ? (
                <div className={styles.profileContainer}>
                    <div className={styles.profileInfo}>
                        <label>Username:</label>
                        <p>{user.username}</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label>Email:</label>
                        <p>{user.email}</p>
                    </div>
                    <div className={styles.profileActions}>
                        <button className={styles.editButton} onClick={() => setUpdateOpen(true)}>
                            <img src={editIcon} alt="Edit" /> Edit
                        </button>
                        <button className={styles.deleteButton} onClick={handleDeleteAccount}>
                            <img src={deleteIcon} alt="Delete" /> Delete
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <hr />

            <div className={styles.filterContainer}>
                <select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Deleted">Deleted</option>
                </select>
            </div>

            <div className={styles.todoList}>
                {filteredTodos().length > 0 ? (
                    filteredTodos().map(todo => (
                        <TodoBox key={todo.id} todo={todo} />
                    ))
                ) : (
                    <p>No tasks created</p>
                )}
            </div>


            <PopupComponent isOpen={isUpdateOpen} onClose={closeUpdateModal}>
                <Update onClose={closeUpdateModal} />
            </PopupComponent>

        </div>
    )
}

export default Profile