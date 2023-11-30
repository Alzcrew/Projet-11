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
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser, logout, updateUsername } from '../../features/counter/authSlice';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import NavBar from '../../components/Navbar/Nav';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
var EditUserPage = function () {
    var _a, _b;
    var _c = useState(""), username = _c[0], setUsername = _c[1];
    var _d = useState(null), successMessage = _d[0], setSuccessMessage = _d[1];
    var _e = useState(null), errorMessage = _e[0], setErrorMessage = _e[1];
    var _f = useState([]), accounts = _f[0], setAccounts = _f[1];
    var _g = useState({}), totalBalances = _g[0], setTotalBalances = _g[1];
    var dispatch = useAppDispatch();
    var user = useAppSelector(function (state) { return state.auth.user; });
    var navigate = useNavigate();
    useEffect(function () {
        var fetchUserProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storedToken, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storedToken = localStorage.getItem('token');
                        if (!storedToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/profile', {
                                method: "POST",
                                headers: {
                                    'Authorization': "Bearer ".concat(storedToken)
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        dispatch(setUser(data));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchUserProfile();
    }, [dispatch]);
    var fetchTransactions = function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
        var storedToken, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    storedToken = localStorage.getItem('token');
                    if (!storedToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch("http://localhost:3001/api/v1/user/accounts/".concat(accountId, "/transactions"), {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(storedToken),
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.body];
                case 3: return [2 /*return*/, []];
            }
        });
    }); };
    var calculateTotalBalance = function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
        var transactions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTransactions(accountId)];
                case 1:
                    transactions = _a.sent();
                    return [2 /*return*/, transactions.reduce(function (acc, transaction) { return acc + transaction.amount; }, 0)];
            }
        });
    }); };
    useEffect(function () {
        var fetchTotalBalances = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newTotalBalances, _i, accounts_1, account, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newTotalBalances = {};
                        _i = 0, accounts_1 = accounts;
                        _c.label = 1;
                    case 1:
                        if (!(_i < accounts_1.length)) return [3 /*break*/, 4];
                        account = accounts_1[_i];
                        _a = newTotalBalances;
                        _b = account.accountId;
                        return [4 /*yield*/, calculateTotalBalance(account.accountId)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        setTotalBalances(newTotalBalances);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchTotalBalances();
    }, [accounts]);
    useEffect(function () {
        var fetchAccounts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storedToken, res, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storedToken = localStorage.getItem('token');
                        return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/accounts', {
                                method: 'GET',
                                headers: {
                                    Authorization: "Bearer ".concat(storedToken),
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        body = (_a.sent()).body;
                        setAccounts(body);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchAccounts();
    }, [dispatch]);
    var handleCancel = function () {
        navigate('/user');
    };
    var handleLogout = function () {
        dispatch(logout());
        localStorage.removeItem('token');
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            if (username === "") {
                setErrorMessage("Le champ de l'username ne peut pas être vide !");
                return [2 /*return*/];
            }
            dispatch(updateUsername(username))
                .then(function (result) {
                if (result.meta.requestStatus === 'fulfilled') {
                    setSuccessMessage("Nom d'utilisateur mis à jour !");
                    setErrorMessage(null);
                    setTimeout(function () {
                        navigate('/user');
                    }, 2000);
                }
            })
                .catch(function (error) {
                setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
            });
            return [2 /*return*/];
        });
    }); };
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, { handleLogout: handleLogout }), _jsxs("main", { className: "main bg-dark", children: [_jsx("h1", { className: 'edit-title', children: "Edit user info" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "input-container", children: [_jsx("label", { children: "User name:" }), _jsx("input", { type: "text", className: 'input-text', placeholder: "Nom d'utilisateur", value: username, onChange: function (e) { return setUsername(e.target.value); } })] }), _jsxs("div", { className: "input-container", children: ["First name: ", _jsx("input", { type: "text", className: 'input-text-disabled', value: ((_a = user === null || user === void 0 ? void 0 : user.body) === null || _a === void 0 ? void 0 : _a.firstName) || '', disabled: true })] }), _jsxs("div", { className: "input-container", children: ["Last name: ", _jsx("input", { type: "text", className: 'input-text-disabled', value: ((_b = user === null || user === void 0 ? void 0 : user.body) === null || _b === void 0 ? void 0 : _b.lastName) || '', disabled: true })] }), successMessage && _jsx("p", { className: "success-message", children: successMessage }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), _jsxs("div", { className: "btn-container", children: [_jsx("button", { type: "submit", className: 'submit-btn', children: "Save" }), _jsx("button", { type: "button", className: 'cancel-btn', onClick: handleCancel, children: "Cancel" })] })] }), accounts.map(function (account) { return (_jsx(AccountSection, { id: account.accountId, title: account.title, amount: "$".concat(totalBalances[account.accountId] || 0), description: "Available Balance" }, account.accountId)); })] }), _jsx(Footer, {})] }));
};
export default EditUserPage;
