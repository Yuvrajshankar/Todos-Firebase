import React from 'react';
import styles from "./deleted.module.css";
import { todoData } from '../../Data/todoData';
import TodoBox from '../../components/TodoBox/TodoBox';
import { useSelector } from 'react-redux';

function Deleted() {
    const todos = useSelector(state => state.todos.items);
    const deletedTodos = todos.filter(todo => todo.status === 'deleted');
    return (
        <div className={styles.container}>
            {deletedTodos.length > 0 ? (
                deletedTodos.map(todo => (
                    <TodoBox key={todo.id} todo={todo} />
                ))
            ) : (
                <p>No deleted tasks</p>
            )}
        </div>
    )
}

export default Deleted
