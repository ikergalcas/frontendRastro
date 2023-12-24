import ShowProductosConLogin from "../productos/ShowProductosConLogin.js";
import ShowProductosSinLogin from "../productos/ShowProductosSinLogin.js";
import NavbarPage from "../navbar/navbar.js";
import { useParams } from "react-router-dom";

function ProductosInicial() {
    const { idUsuario } = useParams()

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {idUsuario ?
                        <ShowProductosConLogin></ShowProductosConLogin>
                        :
                        <ShowProductosSinLogin></ShowProductosSinLogin> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductosInicial