import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { store } from './app/store';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';
import SignIn from './Pages/Sign-in/Sign-in';
import { Navigate } from 'react-router-dom';




const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={user ? <User /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

