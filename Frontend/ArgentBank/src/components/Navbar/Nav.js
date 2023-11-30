import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import argentBankLogo from '../../designs/img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
var NavBar = function (_a) {
    var _b;
    var handleLogout = _a.handleLogout;
    var user = useSelector(function (state) { return state.auth.user; });
    return (_jsxs("nav", { className: "main-nav", children: [_jsxs(Link, { to: "/", className: "main-nav-logo", children: [_jsx("img", { className: "main-nav-logo-image", src: argentBankLogo, alt: "Argent Bank Logo" }), _jsx("h1", { className: "sr-only", children: "Argent Bank" })] }), _jsxs("div", { className: 'main-nav-container', children: [_jsxs(Link, { to: "/user", className: "main-nav-item", children: [((_b = user === null || user === void 0 ? void 0 : user.body) === null || _b === void 0 ? void 0 : _b.userName) || 'Guest', _jsx("div", { className: "main-nav-user", children: _jsx(FontAwesomeIcon, { icon: faUser, size: 'xl' }) })] }), _jsx(Link, { to: "", className: "main-nav-item", children: _jsx(FontAwesomeIcon, { icon: faGear, size: 'xl' }) }), _jsx(Link, { to: "/", className: 'main-nav-item', onClick: function (e) {
                            e.preventDefault();
                            handleLogout();
                        }, children: _jsx(FontAwesomeIcon, { icon: faPowerOff, size: 'xl' }) })] })] }));
};
export default NavBar;
