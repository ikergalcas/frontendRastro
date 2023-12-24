import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProductosInicial from "./pages/ProductosInicial.jsx"
import Login from "./login/Login.js"
import MiProductoBloque from './pages/ProductoBloque.jsx';

import ProductosUsuario from './productos/ShowProductosUsuario.js'
import UserInfo from "./usuario/UserInfo.js"
import MyUserInfo from "./usuario/MyUserInfo.js"
import CrearProdcuto from './pages/CrearProducto.jsx'
import CompEditProducto from './detallesProducto/EditProducto.js';
import EditarPerfil from './usuario/EditarPerfil.js'
import CompBorrarSubasta from './detallesProducto/BorrarSubasta.js';
import CompPago from './pago/Pago.js';
import CompBorrarPuja from './detallesProducto/BorrarPuja.js';
import CompBorrarComentario from './detallesProducto/BorrarComentario.js';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductosInicial/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/productos/:idUsuario" element={<ProductosInicial/>}/>
          <Route path="/detallesProducto/:idUsuario/:idProducto" element={<MiProductoBloque/>}/>
          <Route path="/productosUsuario/:idUsuarioAjeno/:idUsuario/:filtro" element={<ProductosUsuario/>}/>
          <Route path="/nuevoProducto/:idUsuario" element={<CrearProdcuto/>}/>
          <Route path="/editarProducto/:idUsuario/:idProducto" element={<CompEditProducto/>}/>
          <Route path="/userInfo/:idUsuario/:idUsuarioAjeno" element={<UserInfo/>}/>
          <Route path="/myUserInfo/:idUsuario" element={<MyUserInfo/>}/>
          <Route path="/editarPerfil/:idUsuario" element={<EditarPerfil/>}/>
          <Route path='/borrarSubasta/:idProducto/:idUsuario' element={<CompBorrarSubasta/>}/>
          <Route path='/pago/:idUsuario/:idProducto' element={<CompPago/>}/>
          <Route path='/borrarPuja/:idUsuario/:idProducto/:idPuja' element={<CompBorrarPuja/>}/>
          <Route path='/borrarComentario/:idUsuario/:idProducto/:idComentario' element={<CompBorrarComentario/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
