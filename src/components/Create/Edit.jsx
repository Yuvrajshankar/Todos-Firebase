import React, { useEffect, useState } from 'react';
import styles from "./Create.module.css";
import { useDispatch } from 'react-redux';
import { updateTodo } from '../../firebase/todos';
import { updatedTodo, updateTodoStatus } from '../../store/reducers/todoreducer';

function Edit({ todo, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
        }
    }, [todo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { title, description };
        try {
            await updateTodo(todo.id, updatedData);
            dispatch(updatedTodo({ id: todo.id, updatedData }));
            onClose();
        } catch (error) {
            console.error("Error updating todo: ", error);
        }
    };


    return (
        <div className={styles.createContainer}>
            <h2>Edit Task</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="task">Heading</label>
                    <input
                        type="text"
                        id="task"
                        name="task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className={styles.createButton}>Edit it</button>
            </form>
        </div>
    )
}

export default Edit
