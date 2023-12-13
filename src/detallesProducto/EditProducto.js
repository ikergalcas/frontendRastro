import NavbarPage from "../navbar/navbar.js"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"

const CompEditProducto = () => {
    const {idProducto} = useParams()
    const [producto, setProducto] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getProducto()
    }, [])

    const getProducto = async () => {
        try {
            // Hacer la solicitud para obtener productos desde el backend
            const response = await fetch(`http://localhost:3001/productos/${idProducto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                // Manejar la respuesta exitosa, redirigir o realizar otras acciones según sea necesario
                console.log('Producto obtenido con éxito');
                const data = await response.json();
                setProducto(data);
                setDescripcion(data.descripcion || '');
                setUbicacion(data.ubicacion || '');
            } else {
                console.error('Error al obtener el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    }

    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const editar = async (e) => {
        e.preventDefault();

        try {
            // Hacer la solicitud PUT al backend
            const response = await fetch(`http://localhost:3001/productos/${idProducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descripcion: descripcion,
                    ubicacion: ubicacion,
                }),
            });

            if (response.ok) {
                // Manejar la respuesta exitosa, redirigir o realizar otras acciones según sea necesario
                console.log('Producto editado con éxito');
                navigate(`/detallesProducto/${producto.vendedor}/${idProducto}`);
            } else {
                console.error('Error al editar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    }

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container">
                <div id="parte1" className="formularioCrear">
                    <h2>Editar {producto.titulo}</h2>
                    <form onSubmit={editar} id="formularioParte1">
                        <a>Descripción</a>
                        <input
                        id="descripcion"
                        value={descripcion}
                        onChange={ (e) => setDescripcion(e.target.value)}
                        type="text"
                        className="form-control"
                        aria-label="Ingrese la nueva descripcion"
                        />
                        <br/>
                        <a>Ubicación</a>
                        <input
                        id="ubicacion"
                        value={ubicacion}
                        onChange={ (e) => setUbicacion(e.target.value)}
                        type="text"
                        className="form-control"
                        aria-label="Ingrese la nueva ubicacion del objeto"
                        />
                        <button type="submit" className='btn btn-outline-secondary  mt-4'>Guardar</button> <br/>
                        <button onClick={volverAtras} className='btn btn-secondary mt-2'> Volver atrás</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CompEditProducto