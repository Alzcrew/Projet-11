var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUpdatedTransactions } from '../../features/counter/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPen } from '@fortawesome/free-solid-svg-icons';
var CollapseTransaction = function (_a) {
    var date = _a.date, description = _a.description, amount = _a.amount, balance = _a.balance, transactionType = _a.transactionType, category = _a.category, note = _a.note, accountId = _a.accountId, transactionId = _a.transactionId;
    var dispatch = useDispatch();
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = useState(false), isEditingCategory = _c[0], setIsEditingCategory = _c[1];
    var _d = useState(false), isEditingNote = _d[0], setIsEditingNote = _d[1];
    var _e = useState(category), newCategory = _e[0], setNewCategory = _e[1];
    var _f = useState(note), newNote = _f[0], setNewNote = _f[1];
    var toggleCollapse = function () { return setIsOpen(!isOpen); };
    var handleEditCategory = function () { return setIsEditingCategory(!isEditingCategory); };
    var handleEditNote = function () { return setIsEditingNote(!isEditingNote); };
    var handleUpdate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, storedToken, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsEditingCategory(false);
                    setIsEditingNote(false);
                    payload = { category: newCategory, note: newNote };
                    storedToken = localStorage.getItem('token');
                    return [4 /*yield*/, fetch("http://localhost:3001/api/v1/user/accounts/".concat(accountId, "/transactions/").concat(transactionId), {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer ".concat(storedToken) },
                            body: JSON.stringify(payload)
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        setNewCategory(newCategory);
                        setNewNote(newNote);
                        dispatch(fetchUpdatedTransactions(accountId));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: "transaction-container", children: [_jsxs("div", { className: "transaction-header", onClick: toggleCollapse, children: [_jsxs("div", { className: 'collapse-close-details', children: [_jsx("span", { children: date }), _jsx("span", { children: description }), _jsx("span", { children: amount }), _jsx("span", { children: balance })] }), _jsx(FontAwesomeIcon, { icon: faChevronDown })] }), isOpen && (_jsxs("div", { className: "transaction-details", children: [_jsxs("div", { className: 'transaction-detail', children: [_jsx("span", { className: "label", children: "Transaction Type" }), _jsx("span", { children: transactionType })] }), _jsxs("div", { className: 'transaction-detail', children: [_jsx("span", { className: "label", children: "Category" }), _jsxs("div", { children: [isEditingCategory ? (_jsxs(_Fragment, { children: [_jsxs("select", { value: newCategory, onChange: function (e) { return setNewCategory(e.target.value); }, children: [_jsx("option", { value: "food", children: "Food" }), _jsx("option", { value: "health", children: "Health" }), _jsx("option", { value: "investment", children: "Investment" }), _jsx("option", { value: "hobbies", children: "Hobbies" }), _jsx("option", { value: "clothes", children: "Clothes" })] }), _jsx("button", { onClick: handleUpdate, children: "Confirmer" })] })) : (_jsx("span", { children: newCategory })), _jsx(FontAwesomeIcon, { icon: faPen, onClick: handleEditCategory })] })] }), _jsxs("div", { className: 'transaction-detail', children: [_jsx("span", { className: "label", children: "Note" }), _jsxs("div", { children: [isEditingNote ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", value: newNote, onChange: function (e) { return setNewNote(e.target.value); } }), _jsx("button", { onClick: handleUpdate, children: "Confirmer" })] })) : (_jsx("span", { children: newNote })), _jsx(FontAwesomeIcon, { icon: faPen, onClick: handleEditNote })] })] })] }))] }));
};
export default CollapseTransaction;
