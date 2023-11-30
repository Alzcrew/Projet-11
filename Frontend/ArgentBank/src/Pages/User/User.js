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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../../features/counter/authSlice';
import NavBar from '../../components/Navbar/Nav';
import { Header } from '../../components/Header/Header';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import { Footer } from '../../components/Footer/Footer';
var User = function () {
    var _a;
    var dispatch = useDispatch();
    var user = useSelector(function (state) { return state.auth.user; });
    var _b = useState([]), accounts = _b[0], setAccounts = _b[1];
    var _c = useState({}), totalBalances = _c[0], setTotalBalances = _c[1];
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
        var storedToken = localStorage.getItem('token');
        var fetchUserProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/profile', {
                            method: 'POST',
                            headers: {
                                Authorization: "Bearer ".concat(storedToken),
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        dispatch(setUser(data));
                        return [2 /*return*/];
                }
            });
        }); };
        var fetchAccounts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/accounts', {
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
        fetchUserProfile();
        fetchAccounts();
    }, [dispatch]);
    var handleLogout = function () {
        dispatch(logout());
        localStorage.removeItem('token');
    };
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, { handleLogout: handleLogout }), _jsxs("main", { className: "main bg-dark", children: [_jsx(Header, { title: "Welcome back,", username: ((_a = user === null || user === void 0 ? void 0 : user.body) === null || _a === void 0 ? void 0 : _a.userName) ? user.body.userName : 'Loading...' }), accounts.map(function (account) { return (_jsx(AccountSection, { id: account.accountId, title: account.title, amount: "$".concat(totalBalances[account.accountId] || 0), description: "Available Balance" }, account.accountId)); })] }), _jsx(Footer, {})] }));
};
export default User;
