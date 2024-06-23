import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.items = action.payload;
        },
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
        updateTodoStatus: (state, action) => {
            const { id, status } = action.payload;
            const todo = state.items.find(todo => todo.id === id);
            if (todo) {
                todo.status = status;
            }
        },
        updatedTodo: (state, action) => {
            const { id, updatedData } = action.payload;
            const todo = state.items.find(todo => todo.id === id);
            if (todo) {
                Object.assign(todo, updatedData);
            }
        },
        clearTodos: (state) => {
            state.items = [];
        }
    },
});

export const { setTodos, updateTodoStatus, updatedTodo, addTodo, clearTodos } = todosSlice.actions;

export default todosSlice.reducer;
