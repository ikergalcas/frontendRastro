import ShowCrearProducto from "../productos/ShowCrearProducto.js";
import NavbarPage from "../navbar/navbar.js";

function ProductosInicial() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ShowCrearProducto></ShowCrearProducto>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductosInicial