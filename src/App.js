import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Productos from "./productos/ShowProductos.js"
import ProductosInicial from "./pages/ProductosInicial.jsx"
import Login from "./login/Login.js"
import ShowUsuario from "./pages/ShowUsuario.jsx"
import MiProductoBloque from './pages/ProductoBloque.jsx';

import ProductosUsuario from './productos/ShowProductosUsuario.js'
import UserInfo from "./usuario/UserInfo.js"
import MyUserInfo from "./usuario/MyUserInfo.js"
import CrearProdcuto from './pages/CrearProducto.jsx'
import CompEditProducto from './detallesProducto/EditProducto.js';
import EditarPerfil from './usuario/EditarPerfil.js'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductosInicial/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/productos/:idUsuario" element={<ProductosInicial/>}/>
          <Route path="/detallesProducto/:idUsuario/:idProducto" element={<MiProductoBloque/>}/>
          <Route path="/productosUsuario/:idUsuario/:filtro" element={<ProductosUsuario/>}/>
          <Route path="/nuevoProducto/:idUsuario" element={<CrearProdcuto/>}/>
          <Route path="/editarProducto/:idUsuario/:idProducto" element={<CompEditProducto/>}/>
          <Route path="/userInfo/:idUsuario/:idUsuarioAjeno" element={<UserInfo/>}/>
          <Route path="/myUserInfo/:idUsuario" element={<MyUserInfo/>}/>
          <Route path="/editarPerfil/:idUsuario" element={<EditarPerfil/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
