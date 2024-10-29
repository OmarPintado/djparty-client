import React from 'react';
import RoomList from '../components/room/RoomList';
import { Navbar, Container, Nav } from 'react-bootstrap';

export const RoomHome: React.FC = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">DJ Party</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#rooms">Rooms</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    
    <Container>
      <RoomList />
    </Container>
  </>
);

//export default RoomHome;
