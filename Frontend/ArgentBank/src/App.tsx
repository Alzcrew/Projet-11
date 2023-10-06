// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';
import SignUp from './Pages/Sign-up/Sign-up';
import SignIn from './Pages/Sign-in/Sign-in';
import { setToken } from './features/counter/authSlice';  
import EditUserPage from './Pages/edit/Edit-username';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={user || token ? <User /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/edit-username" element={user || token ? <EditUserPage /> : <Navigate to="/sign-in" />} />
        <Route path='/sign-up' element={<SignUp />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
