import NavbarPage from "../navbar/navbar.js"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"

const CompEditProducto = () => {
    const {idUsuario} = useParams()
    const [usuario, setUsuario] = useState([]); 
    const navigate = useNavigate()

    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch(`https://backend-rastro.vercel.app/usuarios/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setUsuario(data);
            setContacto(data.contacto || '');
            setUbicacion(data.ubicacion || '');
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }

    const [contacto, setContacto] = useState('')
    const [ubicacion, setUbicacion] = useState('')

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const editar = async (e) => {
        e.preventDefault();

        try {
            // Hacer la solicitud PUT al backend
            const response = await fetch(`https://backend-rastro.vercel.app/usuarios/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contacto: contacto,
                    ubicacion: ubicacion,
                }),
            });

            if (response.ok) {
                // Manejar la respuesta exitosa, redirigir o realizar otras acciones según sea necesario
                console.log('Usuario editado con éxito');
                navigate(`/myUserInfo/${idUsuario}`);
            } else {
                console.error('Error al editar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al editar el usuario:', error);
        }
    }

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container">
                <h3 className="mt-3 mb-3">Editar mi perfil ({usuario.username})</h3>
                <form onSubmit={editar}>
                        <div className="mb-3">
                            <div className="row">
                                    <div className='col'>
                                        <label className='form-label' tabIndex="0" htmlFor="nombre">Contacto</label>
                                            <input
                                            id="contacto"
                                            value={contacto}
                                            onChange={ (e) => setContacto(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            aria-label="Ingrese la nueva información de contacto"
                                            style={{width:'30%'}}
                                            />
                                    </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                    <div className='col'>
                                        <label className='form-label' tabIndex="0" htmlFor="nombre">Ubicacion</label>
                                            <input
                                            id="ubicacion"
                                            value={ubicacion}
                                            onChange={ (e) => setUbicacion(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            aria-label="Ingrese la nueva ubicacion del objeto"
                                            style={{width:'50%'}}
                                            />
                                    </div>
                            </div>
                        </div>
                        <button type="submit" className='btn btn-outline-secondary'>Guardar</button> <br/>
                        <button onClick={volverAtras} className='btn btn-secondary mt-2'> Volver atrás</button>
                    </form>
            </div>
        </div>
    )

}

export default CompEditProducto