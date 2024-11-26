import { Spinner } from "react-bootstrap";
import "./css/MainSpinner.css"
const MainSpinner = () => {
    return (
        <div className="modal-spinner">
            <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default MainSpinner;
