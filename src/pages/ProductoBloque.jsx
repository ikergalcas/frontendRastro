import CompShowDetallesProducto from "../detallesProducto/ShowDetallesProducto.js";
import CompShowMapaProducto from "../detallesProducto/ShowMapaProducto.js";
import CompShowComentarios from "../detallesProducto/ShowComentarios.js";
import CompShowPujas from "../detallesProducto/ShowPujas.js";

import NavbarPage from "../navbar/navbar.js";

function ProductoBloque() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col">
                        <CompShowDetallesProducto/>   
                    </div>
                </div>
                <div className="row">
                    <div className="col 4">
                        <CompShowPujas/>
                    </div>
                    <div className="col 4">
                        <CompShowComentarios/>
                    </div>
                    <div className="col 4">
                        <CompShowMapaProducto/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductoBloque;