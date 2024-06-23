import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Pending from './pages/Pending/Pending';
import Completed from './pages/Completed/Completed';
import Deleted from './pages/Deleted/Deleted';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Layout from './layout/Layout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { getUserData } from './firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/reducers/authreducer';
import { getTodos } from './firebase/todos';
import { setTodos } from './store/reducers/todoreducer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const todos = useSelector(state => state.todos.items);

  const fetchTodos = (uid) => async (dispatch) => {
    try {
      const todos = await getTodos(uid);
      dispatch(setTodos(todos));
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in.
        const uid = currentUser.uid;
        try {
          const userData = await getUserData(uid);
          if (userData) {
            dispatch(login(userData));
            dispatch(fetchTodos(uid));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/auth' element={!user ? <Auth /> : <Navigate to="/" />} />

        <Route
          path='*'
          element={
            user ? (
              <Layout>
                <Routes>
                  <Route path='/' element={<Pending />} />
                  <Route path='/completed' element={<Completed />} />
                  <Route path='/deleted' element={<Deleted />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App;