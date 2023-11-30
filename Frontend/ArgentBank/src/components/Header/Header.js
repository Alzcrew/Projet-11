import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
export var Header = function (_a) {
    var title = _a.title, username = _a.username;
    var navigate = useNavigate();
    var handleEditNameClick = function () {
        navigate('/edit-username');
    };
    return (_jsxs("div", { className: "header", children: [_jsxs("h1", { className: 'header-title', children: [title, _jsx("br", {}), username] }), _jsx("button", { className: "edit-button", onClick: handleEditNameClick, children: "Edit Name" })] }));
};
