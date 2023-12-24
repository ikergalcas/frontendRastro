import EditUser from "../usuario/UserInfo.js";
import NavbarPage from "../navbar/navbar.js";

function PerfilUsuario() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <EditUser></EditUser>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfilUsuario