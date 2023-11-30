var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
var initialState = {
    user: null,
    status: 'idle',
    error: null,
    token: localStorage.getItem('token'),
    balances: {}
};
export var loginUser = createAsyncThunk('auth/login', function (credentials, _a) {
    var rejectWithValue = _a.rejectWithValue;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.username,
                            password: credentials.password,
                        }),
                    })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    localStorage.setItem('token', data.body.token);
                    return [2 /*return*/, data];
                case 3: return [2 /*return*/];
            }
        });
    });
});
export var updateUsername = createAsyncThunk('auth/updateUsername', function (newUsername, _a) {
    var rejectWithValue = _a.rejectWithValue;
    return __awaiter(void 0, void 0, void 0, function () {
        var storedToken, res, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    storedToken = localStorage.getItem('token');
                    return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/profile', {
                            method: "PUT",
                            headers: {
                                'Authorization': "Bearer ".concat(storedToken),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ userName: newUsername })
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    if (data.status === 200) {
                        return [2 /*return*/, newUsername];
                    }
                    return [2 /*return*/];
            }
        });
    });
});
export var updateBalance = createAsyncThunk('auth/updateBalance', function (newTransaction, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var state, currentTransactions;
        var _b;
        return __generator(this, function (_c) {
            state = getState();
            currentTransactions = state.auth.balances[newTransaction.accountId] || [];
            return [2 /*return*/, __assign(__assign({}, state.auth.balances), (_b = {}, _b[newTransaction.accountId] = __spreadArray(__spreadArray([], currentTransactions, true), [newTransaction], false), _b))];
        });
    });
});
export var fetchUpdatedTransactions = createAsyncThunk('auth/fetchUpdatedTransactions', function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
    var storedToken, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storedToken = localStorage.getItem('token');
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
        }
    });
}); });
var authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: function (state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setUser: function (state, action) {
            state.user = action.payload;
            state.token = action.payload.token;
        },
        setToken: function (state, action) {
            state.token = action.payload;
        },
    },
    extraReducers: function (builder) {
        builder
            .addCase(loginUser.fulfilled, function (state, action) {
            state.user = action.payload;
            state.status = 'succeeded';
        })
            .addCase(loginUser.rejected, function (state, action) {
            state.status = 'failed';
            state.error = action.error.message;
        })
            .addCase(updateUsername.fulfilled, function (state, action) {
            if (state.user) {
                state.user.body.userName = action.payload;
            }
        })
            .addCase(updateBalance.fulfilled, function (state, action) {
            state.balances = action.payload;
        })
            .addCase(fetchUpdatedTransactions.fulfilled, function (state, action) {
            var _a = action.payload, transactions = _a.transactions, accountId = _a.accountId;
            state.balances[accountId] = transactions;
        });
    },
});
export var logout = (_a = authSlice.actions, _a.logout), setUser = _a.setUser, setToken = _a.setToken;
export default authSlice.reducer;
