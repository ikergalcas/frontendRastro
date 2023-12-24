import CompShowDetallesProducto from "../detallesProducto/ShowDetallesProducto.js";
import CompShowMapaProducto from "../detallesProducto/ShowMapaProducto.js";
import CompShowComentarios from "../detallesProducto/ShowComentarios.js";
import CompShowPujas from "../detallesProducto/ShowPujas.js";

import '../App.css'
import NavbarPage from "../navbar/navbar.js";

function ProductoBloque() {

    return (
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col">
                        <h2 className="section-title">Detalles del Producto</h2>
                        <CompShowDetallesProducto/>   
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h2 className="section-title">Pujas</h2>
                        <CompShowPujas/>
                    </div>
                    <div className="col-3">
                        <h2 className="section-title">Comentarios</h2>
                        <CompShowComentarios/>
                    </div>
                    <div className="col-5">
                        <h2 className="section-title">Mapa</h2>
                        <CompShowMapaProducto/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductoBloque;