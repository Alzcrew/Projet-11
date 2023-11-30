import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';
import SignUp from './Pages/Sign-up/Sign-up';
import SignIn from './Pages/Sign-in/Sign-in';
import { setToken } from './features/counter/authSlice';
import EditUserPage from './Pages/edit/Edit-username';
import AccountTransaction from './Pages/Account/Account-details';
var App = function () {
    var dispatch = useDispatch();
    var user = useSelector(function (state) { return state.auth.user; });
    var token = useSelector(function (state) { return state.auth.token; });
    useEffect(function () {
        var storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch(setToken(storedToken));
        }
    }, [dispatch]);
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/user", element: user || token ? _jsx(User, {}) : _jsx(Navigate, { to: "/sign-in" }) }), _jsx(Route, { path: "/sign-in", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/edit-username", element: user || token ? _jsx(EditUserPage, {}) : _jsx(Navigate, { to: "/sign-in" }) }), _jsx(Route, { path: '/sign-up', element: _jsx(SignUp, {}) }), _jsx(Route, { path: '/transactions/:accountId', element: _jsx(AccountTransaction, {}) })] }) }));
};
export default App;
