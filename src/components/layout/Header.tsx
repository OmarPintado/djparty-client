import "./css/Header.css";
import SearchInput from "../common/inputs/InputSearch";
import * as RoomService from "../../services/roomService";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import { MusicRoom } from "../../types";
import { useLocation } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";

const Header = () => {
    const [expand] = useState("md");
    /*const [searchQuery, setSearchQuery] = useState<string>("");
    const location = useLocation();
    const { data, isError, isLoading } = useQuery<MusicRoom[], Error>({
        queryKey: ["searchByName", searchQuery],
        queryFn: () => RoomService.searchByName(searchQuery),
        retry: 1,
        enabled: searchQuery.length > 0,
        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            console.log("Resultados de la búsqueda:", data);
        }
        if (isError) {
            console.error("Error al buscar salas de música.");
        }
    }, [data, isError]);*/
    const { logOut } = useContext(UserContext);
    return (
        <header className="header">
            <Navbar
                key={expand}
                expand={expand}
                className="bg-body-tertiary nav w-100"
            >
                <Container fluid>
                    <Navbar.Brand className="m-0">
                        <Link to={"/"} className="logo">
                            <img src="/djparty.svg" alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand className="text-white fs-2 fw-semibold"> 
                        Hello Faisal!
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
                                        title={<IoSettingsSharp className="home-icon fs-3" />}
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
            {/* <nav className="nav">
                <Link to={"/"} className="logo">
                    <img src="/djparty.svg" alt="Logo" />
                </Link>
                <SearchInput
                    onSearch={(value) => {
                        console.log(value);
                    }}
                />
                <UserMenu />
            </nav>*/}
        </header>
    );
};

export default Header;
