import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./config";

// CREATE TODO
export const createTodo = async (uid, title, description) => {
    try {
        console.log("Adding todo for UID:", uid); // Log the UID
        const docRef = await addDoc(collection(db, 'todos'), {
            uid,
            title,
            description,
            status: 'pending',
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding todo: ", error);
        throw error;
    }
};

// UPDATE TODO
export const updateTodo = async (id, updatedData) => {
    try {
        const todoRef = doc(db, 'todos', id);
        await updateDoc(todoRef, updatedData);
    } catch (error) {
        console.error("Error updating todo: ", error);
        throw error;
    }
};

// GET ALL TODOS
export const getTodos = async (uid) => {
    try {
        const todosQuery = query(collection(db, 'todos'), where("uid", "==", uid));
        const querySnapshot = await getDocs(todosQuery);
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() });
        });
        return todos;
    } catch (error) {
        console.error("Error getting todos: ", error);
        throw error;
    }
};
