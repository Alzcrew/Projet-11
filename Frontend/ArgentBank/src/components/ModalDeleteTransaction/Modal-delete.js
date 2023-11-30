import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from 'react-modal';
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
var DeleteTransactionModal = function (_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, onDelete = _a.onDelete, selectedTransaction = _a.selectedTransaction;
    return (_jsx(Modal, { isOpen: isOpen, onRequestClose: onRequestClose, style: customStyles, children: _jsxs("div", { className: "modal-content", children: [_jsx("h2", { children: "Supprimer une transaction" }), _jsx("p", { children: "\u00CAtes-vous s\u00FBr de vouloir supprimer cette transaction?" }), _jsx("button", { type: "button", className: 'submit-btn', onClick: function () { return onDelete(selectedTransaction); }, children: "Oui" }), _jsx("button", { type: "button", className: 'submit-btn', onClick: onRequestClose, children: "Non" })] }) }));
};
export default DeleteTransactionModal;
