import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export var AccountSection = function (_a) {
    var title = _a.title, amount = _a.amount, description = _a.description, id = _a.id, icon = _a.icon;
    var navigate = useNavigate();
    var handleTransactionClick = function () {
        if (icon === faXmark) {
            navigate('/user');
        }
        else {
            navigate("/transactions/".concat(id));
        }
    };
    return (_jsx("div", { onClick: handleTransactionClick, className: "account-clickable", children: _jsxs("section", { className: "account", children: [_jsxs("div", { className: "account-content-wrapper", children: [_jsx("h3", { className: "account-title", children: title }), _jsx("p", { className: "account-amount", children: amount }), _jsx("p", { className: "account-amount-description", children: description })] }), _jsx("div", { className: "account-content-wrapper cta", children: _jsx("button", { className: "transaction-button", children: _jsx(FontAwesomeIcon, { icon: icon || faChevronRight, size: '6x' }) }) })] }) }));
};
