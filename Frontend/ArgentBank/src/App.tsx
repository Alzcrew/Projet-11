import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';
import SignIn from './Pages/Sign-in/Sign-in';
import { setUser } from './features/counter/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);  // <-- Ajouté

  console.log("User from Redux State:", user);  // <-- Ajouté

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Stored Token:", storedToken);  // <-- Déjà là

    if (storedToken) {  // <-- Modifié
      dispatch(setUser({ token: storedToken }));  // <-- Mise à jour du token dans le store Redux
      // Faites un appel API pour obtenir les données utilisateur
      fetch('http://localhost:3001/api/v1/user/profile', {
      method: "POST",
        headers: {
          'Authorization': `Bearer ${storedToken}`  // Assurez-vous d'avoir un espace après "Bearer"
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Data from API:", data);  // <-- Ajouté
        dispatch(setUser(data));
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
      });
    }
  }, [dispatch]);  // <-- Ajouté token comme dépendance

  console.log("Debug App.tsx:", { user, token });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={user || token ? <User /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
