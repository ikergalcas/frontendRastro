import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { redirect, useNavigate, useParams } from 'react-router-dom'
import fotoUser from "../imagenes/usuario.jpg"
import React, { useState, useEffect } from 'react';

function NavbarPage(props) {
  const {idUsuario} = useParams()
  const [nombreUsuario,setNombreUsuario]=useState([])
  useEffect(() => {
    if(idUsuario!=undefined){
      getUsuario()
    } 
}, []);

const getUsuario = async () => {
    // Hacer la solicitud para obtener productos desde el backend
    fetch(`http://localhost:3003/usuarios/${idUsuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
      .then(data => {
            // Actualizar el estado con los productos obtenidos
            setNombreUsuario(data.username);
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

    return (
    (idUsuario != undefined) ?
    (<Navbar expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="me-auto">
          <Nav.Link href={`/productos/${idUsuario}`} className='navbar-link' style={{marginLeft: '10vmin'}}> Home
          </Nav.Link>
          <Nav.Link href={`/nuevoProducto/${idUsuario}`} className='navbar-link' style={{marginLeft: '10vmin'}}> Crear un producto
          </Nav.Link> 
        </Nav>
        <NavItem>{nombreUsuario}</NavItem>
        <Nav>
            <NavDropdown drop='start' className='me-3' title={<img src={fotoUser} style={{ width: '6vh', borderRadius: '50%' }} alt="" />} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/myUserInfo/${idUsuario}`}>Ver mi perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>) : 
    (<Navbar expand="lg" className="navbar">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
      <Nav className="me-auto">
        <Nav.Link href={`/`} className='navbar-link' style={{marginLeft: '10vmin'}}> Home
        </Nav.Link>
        <Nav.Link href={`/login`} className='navbar-link' style={{marginLeft: '10vmin'}}> Inicio de sesion
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>));
  }

  export default NavbarPage;