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
                const data = await response.json();
                setProducto(data);
                setDescripcion(data.descripcion || '');
                setUbicacion(data.ubicacion || '');
                setPrecio(data.precioInicial || '');
                setFechaCierre(data.fechaCierre || '');
            } else {
                console.error('Error al obtener el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    }

    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [fechaCierre, setFechaCierre] = useState('')
    const [precio, setPrecio] = useState('')

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const editar = async (e) => {
        e.preventDefault();

        if (producto.pujas && producto.pujas.length === 0) {
            // Agregar campos adicionales si se cumple la condición
            var raw = JSON.stringify({
                "descripcion": descripcion,
                "ubicacion": ubicacion,
                "precioInicial": precio,
                "fechaCierre": fechaCierre,
            });
            
        } else {
            var raw = JSON.stringify({
                "descripcion": descripcion,
                "ubicacion": ubicacion,
            })
        }
        try {
            // Hacer la solicitud PUT al backend
            const response = await fetch(`http://localhost:3001/productos/${idProducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: raw
                ,
            });
            if (response.ok) {
                // Manejar la respuesta exitosa, redirigir o realizar otras acciones según sea necesario
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
            {producto && (
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
                            <br/>
                            {producto.pujas && producto.pujas.length == 0 && (
                            <div>
                                <a>Precio inicial</a>
                                <input
                                id="precio"
                                value={precio}
                                onChange={ (e) => setPrecio(e.target.value)}
                                type="number"
                                className="form-control"
                                aria-label="Ingrese el precio inicial de la subasta"
                                />
                                <br/>

                                <a>Fecha de cierre</a>
                                <input
                                id="fechaCierre"
                                value={fechaCierre.substring(0,10)}
                                onChange={ (e) => setFechaCierre(e.target.value)}
                                type="date"
                                className="form-control"
                                aria-label="Ingrese la fecha de cierre de la subasta"
                                />
                                <br/>
                            </div>   
                            )}
                            <button type="submit" className='btn btn-outline-secondary  mt-4'>Guardar</button> <br/>
                            <button onClick={volverAtras} className='btn btn-secondary mt-2'> Volver atrás</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )

}

export default CompEditProducto