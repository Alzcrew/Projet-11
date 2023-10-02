import React from 'react';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import { useDispatch } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import NavBar from '../../components/Navbar/Nav';
import { logout } from '../../features/counter/authSlice';

const EditUserPage: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <>
      <NavBar  handleLogout={handleLogout}  />
      <main className="main bg-dark">
        <h1>Edit user info</h1>
        <form>
          <label>
            User name: <input type="text" />
          </label>
          <label className="disabled">
            First name: <input type="text" disabled />
          </label>
          <label className="disabled">
            Last name: <input type="text" disabled />
          </label>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </form>
        <AccountSection title="..." amount="..." description="..." />
        <AccountSection title="..." amount="..." description="..." />
        <AccountSection title="..." amount="..." description="..." />
      </main>
      <Footer />
    </>
  );
};

export default EditUserPage;
