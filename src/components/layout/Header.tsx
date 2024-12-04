import "./css/Header.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";

const Header = () => {
    const [expand] = useState("md");
    const { logOut, user } = useContext(UserContext);
    return (
        <header className="header">
            <Navbar
                key={expand}
                expand={expand}
                className="bg-body-tertiary nav w-100"
            >
                <Container
                    fluid
                    className="align-items-center justify-content-around"
                >
                    <Navbar.Brand className="m-0">
                        <Link to={"/"} className="logo m-0 me-md-1">
                            <img src="/djparty.svg" alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand className="text-custom text-center  text-custom text-capitalize fs-2 fw-semibold ">
                        Hello {user?.fullName} !
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${expand}`}
                    />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title
                                className="text-white"
                                id={`offcanvasNavbarLabel-expand-${expand}`}
                            >
                                DjParty
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="searchContainer">
                                <Nav className="gap-4">
                                    <Link
                                        to="/"
                                        className="text-white text-decoration-none"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to={"/perfil"}
                                        className="text-decoration-none text-white"
                                    >
                                        Perfil
                                    </Link>
                                    <button
                                        onClick={logOut}
                                        className="btn btn-danger"
                                    >
                                        Cerrar sesión
                                    </button>
                                </Nav>
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
