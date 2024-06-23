import React, { useState } from 'react';
import styles from "./todobox.module.css";
import view from "../../assets/eye.svg";
import edit from "../../assets/edit.svg";
import done from "../../assets/done.svg";
import trash from "../../assets/trash.svg";
import cancel from "../../assets/no.svg";
import restore from "../../assets/restore.svg";
import Edit from '../Create/Edit';
import PopupComponent from '../Popup/Popup';
import View from '../View/View';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../../firebase/todos';
import { updateTodoStatus } from '../../store/reducers/todoreducer';

const formatDate = (timestamp) => {
    const dateObject = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return isNaN(dateObject) ? 'Invalid Date' : dateObject.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

function TodoBox({ todo }) {
    const [isEditOpen, setEditOpen] = useState(false);
    const [isViewOpen, setViewOpen] = useState(false);
    const dispatch = useDispatch();

    const closeEditModal = () => setEditOpen(false);
    const closeViewModal = () => setViewOpen(false);

    const handleUpdateStatus = async (newStatus) => {
        try {
            await updateTodo(todo.id, { status: newStatus });
            dispatch(updateTodoStatus({ id: todo.id, status: newStatus }))
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusStyle = () => {
        switch (todo.status) {
            case 'completed':
                return { backgroundColor: 'var(--com)' };
            case 'pending':
                return { backgroundColor: 'var(--pen)' };
            case 'deleted':
                return { backgroundColor: 'var(--del)' };
            default:
                return {};
        }
    };

    const renderButtons = () => {
        switch (todo.status) {
            case 'completed':
                return (
                    <>
                        <button onClick={() => handleUpdateStatus('pending')}>
                            <img src={cancel} alt="cancel" />
                        </button>
                        <button onClick={() => handleUpdateStatus('deleted')}>
                            <img src={trash} alt="trash" />
                        </button>
                    </>
                );
            case 'pending':
                return (
                    <>
                        <button onClick={() => setEditOpen(true)}>
                            <img src={edit} alt="edit" />
                        </button>
                        <button onClick={() => handleUpdateStatus('completed')}>
                            <img src={done} alt="done" />
                        </button>
                        <button onClick={() => handleUpdateStatus('deleted')}>
                            <img src={trash} alt="trash" />
                        </button>
                    </>
                );
            case 'deleted':
                return (
                    <button onClick={() => handleUpdateStatus('pending')}>
                        <img src={restore} alt="restore" />
                    </button>
                );
            default:
                return null;
        }
    };


    return (
        <div className={styles.todoBox}>
            <div className={styles.top}>
                <p style={getStatusStyle()}>{todo.status}</p>
                <button onClick={() => setViewOpen(true)}>
                    <img src={view} alt="view" />
                </button>
            </div>
            <div className={styles.middle}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
            </div>
            <div className={styles.bottom}>
                <span>{formatDate(todo.createdAt)}</span>
                <div className={styles.buttons}>
                    {renderButtons()}
                </div>
            </div>

            <PopupComponent isOpen={isEditOpen} onClose={closeEditModal}>
                <Edit todo={todo} onClose={closeEditModal} />
            </PopupComponent>

            <PopupComponent isOpen={isViewOpen} onClose={closeViewModal}>
                <View title={todo.title} description={todo.description} />
            </PopupComponent>
        </div>
    )
}

export default TodoBox
