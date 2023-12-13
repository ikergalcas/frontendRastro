import ShowProductos from "../productos/ShowProductos.js";
import NavbarPage from "../navbar/navbar.js";

function ProductosInicial() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ShowProductos></ShowProductos>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductosInicial