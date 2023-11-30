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
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import NavBar from '../../components/Navbar/Nav';
import { logout } from '../../features/counter/authSlice';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import CollapseTransaction from '../../components/CollapseTransaction/Collapse-transaction';
import AddTransactionModal from '../../components/ModalAddTransaction/Modal-add';
import DeleteTransactionModal from '../../components/ModalDeleteTransaction/Modal-delete';
var AccountTransaction = function () {
    var dispatch = useDispatch();
    var navigate = useNavigate();
    var _a = useParams().accountId, accountId = _a === void 0 ? "" : _a;
    var _b = useState([]), transactions = _b[0], setTransactions = _b[1];
    var _c = useState([]), accounts = _c[0], setAccounts = _c[1];
    var _d = useState(false), showAddModal = _d[0], setShowAddModal = _d[1];
    var _e = useState(false), showDeleteModal = _e[0], setShowDeleteModal = _e[1];
    var _f = useState(null), selectedTransaction = _f[0], setSelectedTransaction = _f[1];
    var _g = useState(null), deleteMessage = _g[0], setDeleteMessage = _g[1];
    var _h = useState(false), allowDelete = _h[0], setAllowDelete = _h[1];
    var handleLogout = function () {
        dispatch(logout());
        localStorage.removeItem('token');
    };
    var calculateTotalBalance = function (transactions) {
        return transactions.reduce(function (acc, transaction) { return acc + transaction.amount; }, 0);
    };
    var handleXmarkClick = function () {
        navigate('/user');
    };
    var openAddModal = function () {
        setShowAddModal(true);
    };
    var openDeleteModal = function (transactionId, _id) {
        console.log("openDeleteModal called with transactionId:", transactionId);
        if (allowDelete) {
            setSelectedTransaction(transactionId);
            setShowDeleteModal(true);
            setAllowDelete(false);
            setDeleteMessage(null);
        }
    };
    var closeDeleteModal = function () {
        setShowDeleteModal(false);
        setAllowDelete(false);
        setDeleteMessage(null);
    };
    var deleteTransaction = function (transactionId) { return __awaiter(void 0, void 0, void 0, function () {
        var storedToken, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("deleteTransaction called with ID:", transactionId);
                    storedToken = localStorage.getItem('token');
                    if (!storedToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch("http://localhost:3001/api/v1/user/accounts/".concat(accountId, "/transactions/").concat(transactionId), {
                            method: 'DELETE',
                            headers: {
                                'Authorization': "Bearer ".concat(storedToken),
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    console.log("API response:", res);
                    console.log("API response data:", data);
                    if (res.status === 200) {
                        setTransactions(transactions.filter(function (t) { return t._id !== transactionId; }));
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var confirmDeleteTransaction = function () {
        console.log("confirmDeleteTransaction called with selectedTransaction:", selectedTransaction); // Log 3
        if (selectedTransaction) {
            console.log(confirmDeleteTransaction);
            deleteTransaction(selectedTransaction);
            closeDeleteModal();
        }
    };
    useEffect(function () {
        var fetchTransactions = function () { return __awaiter(void 0, void 0, void 0, function () {
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
                        setTransactions(data.body);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        var fetchAccounts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storedToken, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storedToken = localStorage.getItem('token');
                        if (!storedToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch("http://localhost:3001/api/v1/user/accounts", {
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
                        setAccounts(data.body);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchTransactions();
        fetchAccounts();
    }, [accountId]);
    var totalBalance = calculateTotalBalance(transactions);
    var account = accounts.find(function (acc) { return acc.accountId === accountId; });
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, { handleLogout: handleLogout }), _jsxs("main", { className: "main bg-dark", children: [_jsx("div", { className: "account-detail-container", children: account && (_jsx(AccountSection, { id: account.accountId, title: account.title, amount: "$".concat(totalBalance), description: "Available Balance", icon: faXmark, onClickIcon: handleXmarkClick })) }), _jsxs("div", { className: "add-delete-transaction", children: [_jsx("div", { className: "add-transaction", children: _jsx(FontAwesomeIcon, { icon: faPlus, size: '2x', onClick: openAddModal }) }), _jsx("div", { className: "delete-transaction", children: _jsx(FontAwesomeIcon, { icon: faTrash, size: 'xl', onClick: function () { setDeleteMessage("Choisissez la transaction à supprimer"); setAllowDelete(true); } }) })] }), deleteMessage && _jsx("div", { className: "delete-message", children: deleteMessage }), _jsxs("div", { className: "categories-container", children: [_jsx("span", { children: "Date" }), _jsx("span", { children: "Description" }), _jsx("span", { children: "Amount" }), _jsx("span", { children: "Balance" })] }), _jsx("div", { className: "collapses-container", children: transactions.map(function (transaction, index) { return (_jsx("div", { onClick: function () { return openDeleteModal(transaction._id); }, children: _jsx(CollapseTransaction, { accountId: accountId, date: transaction.date, description: transaction.description, amount: "$".concat(transaction.amount), balance: transaction.balance, transactionType: transaction.type, category: transaction.category, note: transaction.note, transactionId: transaction._id }) }, index)); }) })] }), _jsx(Footer, {}), accountId && _jsx(AddTransactionModal, { isOpen: showAddModal, onRequestClose: function () { return setShowAddModal(false); }, accountId: accountId }), _jsx(DeleteTransactionModal, { isOpen: showDeleteModal, onRequestClose: closeDeleteModal, selectedTransaction: selectedTransaction, onDelete: confirmDeleteTransaction })] }));
};
export default AccountTransaction;
