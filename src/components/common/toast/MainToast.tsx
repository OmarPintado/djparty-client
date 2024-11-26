import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContextProvider";
import "./css/MainToast.css";

function MainToast() {
    const { toastProps, showToast, setToastProps } = useContext(UserContext);
    return (
        <ToastContainer
            className="p-3"
            position="top-end"
            style={{ zIndex:9999 }}
        >
            <Toast
                onClose={() => setToastProps({ message: "", class: "" })}
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
                    <strong className="me-auto">{toastProps.message}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body className={`toast-body-custom ${toastProps.class}`}>
                    {toastProps.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default MainToast;
