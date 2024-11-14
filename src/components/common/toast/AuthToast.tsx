import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContextProvider";

function AuthToast() {
    const { toastTitle, toastMessage, showToast, setShowToast } =
        useContext(UserContext);
    return (
        <ToastContainer
            className="p-3"
            position="top-end"
            style={{ zIndex: 1 }}
        >
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{toastTitle}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default AuthToast;
