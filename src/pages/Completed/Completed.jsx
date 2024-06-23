import React from 'react';
import styles from "./completed.module.css";
import { todoData } from '../../Data/todoData';
import TodoBox from '../../components/TodoBox/TodoBox';
import { useSelector } from 'react-redux';

function Completed() {
    const todos = useSelector(state => state.todos.items);
    const completedTodos = todos.filter(todo => todo.status === 'completed');

    return (
        <div className={styles.container}>
            {completedTodos.length > 0 ? (
                completedTodos.map(todo => (
                    <TodoBox key={todo.id} todo={todo} />
                ))
            ) : (
                <p>No completed tasks</p>
            )}
        </div>
    )
}

export default Completed
