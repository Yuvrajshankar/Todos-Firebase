import React, { useState } from 'react';
import styles from "./Create.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../../firebase/todos';
import { addTodo } from '../../store/reducers/todoreducer';

function Create({ onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error("User not authenticated");
            return;
        }
        try {
            const newTodo = {
                uid: user.uid,
                title,
                description,
                status: 'pending',
                createdAt: new Date(),
            };
            const id = await createTodo(
                user.uid,
                newTodo.title,
                newTodo.description
            );
            newTodo.id = id;
            dispatch(addTodo(newTodo));
            setTitle("");
            setDescription("");
            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    return (
        <div className={styles.createContainer}>
            <h2>Create Task</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="heading">Heading</label>
                    <input type="text" id="heading" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required></textarea>
                </div>
                <button type="submit" className={styles.createButton}>Create</button>
            </form>
        </div>
    );
}

export default Create;
