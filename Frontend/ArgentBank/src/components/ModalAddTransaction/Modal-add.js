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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Modal from 'react-modal';
// Styles
var customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
// Validation du Payload
var isPayloadValid = function (payload) {
    return Object.values(payload).every(function (value) { return value !== null && value !== ''; });
};
var AddTransactionModal = function (_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, accountId = _a.accountId;
    var _b = useState(null), successMessage = _b[0], setSuccessMessage = _b[1];
    var _c = useState(null), errorMessage = _c[0], setErrorMessage = _c[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, date, _a, year, month, day, convertedDate, payload, storedToken, res, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    setSuccessMessage(null);
                    setErrorMessage(null);
                    formData = new FormData(e.currentTarget);
                    date = formData.get('date');
                    _a = date.split('-'), year = _a[0], month = _a[1], day = _a[2];
                    convertedDate = "".concat(year, "-").concat(month, "-").concat(day);
                    payload = {
                        accountId: accountId,
                        date: convertedDate,
                        description: formData.get('description'),
                        amount: Number(formData.get('amount')),
                        balance: formData.get('balance'),
                        type: formData.get('type'),
                        category: formData.get('category'),
                        note: formData.get('note')
                    };
                    if (!isPayloadValid(payload)) return [3 /*break*/, 3];
                    storedToken = localStorage.getItem('token');
                    return [4 /*yield*/, fetch("http://localhost:3001/api/v1/user/accounts/".concat(accountId, "/transactions"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(storedToken)
                            },
                            body: JSON.stringify(payload)
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    if (data.status === 201) {
                        setSuccessMessage("Transaction ajoutée avec succès !");
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    }
                    else {
                        setErrorMessage("Une erreur s'est produite lors de l'ajout de la transaction.");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setErrorMessage("Veuillez remplir tous les champs !");
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(Modal, { isOpen: isOpen, onRequestClose: onRequestClose, style: customStyles, children: _jsxs("div", { className: "modal-content", children: [_jsx("h2", { children: "Add a transaction" }), successMessage && _jsx("p", { className: "success-message", children: successMessage }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), _jsxs("form", { onSubmit: handleSubmit, className: 'form-add-transaction', children: [_jsx("input", { type: "date", name: "date", placeholder: "Date", className: 'input-container input-text' }), _jsx("input", { type: "text", name: "description", placeholder: "Description", className: 'input-container input-text' }), _jsx("input", { type: "text", name: "amount", placeholder: "Amount", className: 'input-container input-text' }), _jsx("input", { type: "text", name: "balance", placeholder: "Balance", className: 'input-container input-text' }), _jsxs("select", { name: "type", className: 'input-container input-text', children: [_jsx("option", { value: "deposit", children: "D\u00E9p\u00F4t" }), _jsx("option", { value: "withdrawal", children: "Retrait" })] }), _jsxs("select", { name: "category", className: 'input-container input-text', children: [_jsx("option", { value: "food", children: "Food" }), _jsx("option", { value: "health", children: "Health" }), _jsx("option", { value: "investment", children: "Investment" }), _jsx("option", { value: "hobbies", children: "Hobbies" }), _jsx("option", { value: "clothes", children: "Clothes" })] }), _jsx("input", { type: "text", name: "note", placeholder: "Note", className: 'input-container input-text' }), _jsx("button", { type: "submit", className: 'submit-btn', children: "Add" })] })] }) }));
};
export default AddTransactionModal;
