import "./css/Header.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { IoSettingsSharp } from "react-icons/io5";

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
                <Container fluid className="align-items-center justify-content-center">
                    <Navbar.Brand className="m-0">
                        <Link to={"/"} className="logo m-0 me-md-1">
                            <img src="/djparty.svg" alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand className="text-custom fs-2 fw-semibold ">
                        Hello <span className="text-capitalize">{user?.fullName} !</span>
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
                                {/*location.pathname === "/" && (
                                    <SearchInput
                                        onSearch={(value) =>
                                            setSearchQuery(value)
                                        }
                                    />
                                )*/}
                                <Nav className="">
                                    <Nav.Link href="/" className="text-white">
                                        Home
                                    </Nav.Link>
                                    <NavDropdown
                                        title={
                                            <IoSettingsSharp className="home-icon fs-3" />
                                        }
                                        className="menu-options"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <Link to={"/perfil"}>Perfil</Link>
                                        <NavDropdown.Divider />
                                        <button onClick={logOut}>
                                            Cerrar sesión
                                        </button>
                                    </NavDropdown>
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
