import { Link } from "react-router-dom";

const AccessDeniedPage = () => {
    return (
        <div className="text-white" style={{ textAlign: "center", padding: "20px" }}>
            <h1>No tienes acceso a esta sala</h1>
            <p>Lo sentimos, no puedes acceder a esta sala.</p>
            <Link to="/" style={{ textDecoration: "none", color: "#2278f5" }}>
                Regresar a la página principal
            </Link>
        </div>
    );
};

export default AccessDeniedPage;
