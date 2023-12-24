import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { redirect, useNavigate, useParams } from 'react-router-dom'
import fotoUser from "../imagenes/usuario.jpg"
import React, { useState, useEffect } from 'react';

function NavbarPage() {
  const {idUsuario} = useParams()
  const [nombreUsuario,setNombreUsuario]=useState('')
  const [foto,setFoto]=useState('')
  const [pendientes, setPendientes] = useState(0)

  useEffect(() => {
    if(localStorage.getItem('objetoToken')!=undefined){
      comprobarConexion() ///AJUSTAR A ESTE PROYECTO
      setNombreUsuario(JSON.parse(localStorage.getItem('objetoToken')).correo)
      setFoto(JSON.parse(localStorage.getItem('objetoToken')).foto)
      getPendientes()
    } 
  }, []);

  const getPendientes = async () => {
    fetch(`http://localhost:3003/usuarios/${idUsuario}/productos/pendientes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
    .then(data => {
        setPendientes(data.length);
        console.log(data.length);
    })
    .catch(error => {
        console.error('Error al obtener el usuario:', error);
    })
}


  const comprobarConexion = async () => {
    fetch(`http://localhost:3003/usuarios/conexion/${idUsuario}/${JSON.parse(localStorage.getItem('objetoToken')).tokenId}/${JSON.parse(localStorage.getItem('objetoToken')).tokenCompleto}`, {  
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    }).then(res => res.text())
    .then(data => {
      console.log(data)
      if(data=="expired" || data=="invalid token"){
        localStorage.clear()
        alert("Tu sesion ha expirado")
        window.location.href = '/login'
      }else if (data=="sesionChanged"){
        alert("Has cambiando de cuenta")
        window.location.href = '/login'
      }
    })
    .catch(error => {
        console.error('Error al validar token:', error);
    });
  }

function cerrarSesion () {
  console.log("en Cerrar sesion")
  localStorage.clear();
      // Redirige a show productos pero sin sesion iniciada
  window.location.href = '/';
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
          {pendientes > 0 && (<Nav.Link href={`../productosUsuario/${idUsuario}/${idUsuario}/pendientes`} className='navbar-link' style={{marginLeft: '10vmin'}}> Pendiente de pago ({pendientes})
          </Nav.Link> )}
        </Nav>
        <NavItem>{nombreUsuario}</NavItem>
        <Nav>
            <NavDropdown drop='start' className='me-3' title={<img src={foto} style={{ width: '6vh', borderRadius: '50%' }} alt="" />} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/myUserInfo/${idUsuario}`}>Ver mi perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={cerrarSesion} >Cerrar sesión</NavDropdown.Item>
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