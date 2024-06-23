import React, { useEffect, useState } from 'react';
import styles from "./update.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../firebase/auth';
import { login } from '../../store/reducers/authreducer';

function Update({ onClose }) {
    const user = useSelector(state => state.auth.user);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const dispatch = useDispatch();


    // Initialize state values from user object on component mount
    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedData = {};
        if (username !== user.username) {
            updatedData.username = username;
        }
        if (email !== user.email) {
            updatedData.email = email;
        }

        if (Object.keys(updatedData).length > 0) {
            try {
                const updatedUser = await updateUserProfile(user.uid, updatedData);

                dispatch(login({
                    uid: updatedUser.uid,
                    username: updatedUser.displayName,
                    email: updatedUser.email
                }));
                onClose();
            } catch (error) {
                console.error('Error updating user profile:', error);
            }
        }
    };

    return (
        <div className={styles.forms}>
            <h2>Update account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default Update
