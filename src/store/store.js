import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authreducer";
import todosReducer from "./reducers/todoreducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
    },
});

export default store;