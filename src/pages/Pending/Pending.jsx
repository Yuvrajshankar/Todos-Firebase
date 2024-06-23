import React from 'react';
import styles from "./pending.module.css";
import { todoData } from '../../Data/todoData';
import TodoBox from '../../components/TodoBox/TodoBox';
import { useSelector } from 'react-redux';

function Pending() {
    const todos = useSelector(state => state.todos.items);
    const pendingTodos = todos.filter(todo => todo.status === 'pending');

    return (
        <div className={styles.container}>
            {pendingTodos.length > 0 ? (
                pendingTodos.map(todo => (
                    <TodoBox key={todo.id} todo={todo} />
                ))
            ) : (
                <p>No pending tasks</p>
            )}
        </div>
    )
}

export default Pending
