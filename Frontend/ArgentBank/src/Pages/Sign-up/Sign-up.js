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
import { Link, useNavigate } from 'react-router-dom';
import argentBankLogo from '../../designs/img/argentBankLogo.png';
import { Footer } from "../../components/Footer/Footer";
var SignUp = function () {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(''), firstName = _c[0], setFirstName = _c[1];
    var _d = useState(''), lastName = _d[0], setLastName = _d[1];
    var _e = useState(''), userName = _e[0], setUserName = _e[1];
    var _f = useState(null), successMessage = _f[0], setSuccessMessage = _f[1];
    var _g = useState(null), errorMessage = _g[0], setErrorMessage = _g[1];
    var navigate = useNavigate();
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3001/api/v1/user/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                                firstName: firstName,
                                lastName: lastName,
                                userName: userName,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.status === 200) {
                        setSuccessMessage("Inscription réussie !");
                        setErrorMessage(null);
                        setTimeout(function () {
                            navigate('/');
                        }, 2000);
                    }
                    else {
                        setErrorMessage("Une erreur s'est produite lors de l'inscription.");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    setErrorMessage("Une erreur s'est produite lors de l'inscription.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: "container-page-inscription", children: [_jsx("nav", { className: "sign-in-nav", children: _jsxs(Link, { to: "/", className: "sign-in-nav-logo", children: [_jsx("img", { className: "home-nav-logo-image", src: argentBankLogo, alt: "Argent Bank Logo" }), _jsx("h1", { className: "sr-only", children: "Argent Bank" })] }) }), _jsxs("div", { className: 'form-container', children: [_jsx("h1", { children: "Inscription" }), successMessage && _jsx("p", { className: "success-message", children: successMessage }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), _jsxs("form", { onSubmit: handleSubmit, className: 'inscription-form', children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: 'input-container input-text' }), _jsx("input", { type: "password", placeholder: "Mot de passe", value: password, onChange: function (e) { return setPassword(e.target.value); }, className: 'input-container input-text' }), _jsx("input", { type: "text", placeholder: "Pr\u00E9nom", value: firstName, onChange: function (e) { return setFirstName(e.target.value); }, className: 'input-container input-text' }), _jsx("input", { type: "text", placeholder: "Nom", value: lastName, onChange: function (e) { return setLastName(e.target.value); }, className: 'input-container input-text' }), _jsx("input", { type: "text", placeholder: "Nom d'utilisateur", value: userName, onChange: function (e) { return setUserName(e.target.value); }, className: 'input-container input-text' }), _jsx("button", { type: "submit", className: 'cancel-btn', children: "S'inscrire" })] })] }), _jsx(Footer, {})] }));
};
export default SignUp;
