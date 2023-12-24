import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ShowProductosSinLogin = () => {
    const {idUsuario} = useParams()
    const [productos, setProductos] = useState([]);


    useEffect(() => {
        getProductos()
    }, []);

    const getProductos = async () => {
        // Hacer la solicitud para obtener productos desde el backend
        // Mostramos todos los productos cuya subasta sigue abierta (vendido = false)
        fetch('http://localhost:3001/productos/inicio/mostrar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                setProductos(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

return(
    <div>
        <div className="row" style={{justifyContent: 'center',marginTop: '3%'}}>  
            {productos.length==0 ? (
                <p> No hay productos en subasta ahora mismo</p> 
            ) : productos.map(producto => (
                <div class="card tarjeta col-md-3 col-sm-2" >
                    <div className="card-body">
                        <img className="card-img-top" src={producto.foto} alt={producto.titulo} style={{ objectFit: 'contain', height: '25vmin'}} />
                        <h5 className="card-title">{producto.titulo}</h5>
                        <p className="card-text">{producto.descripcion}</p>
                        <p className="card-text">Maxima puja: {producto.maximaPuja}</p>
                        {idUsuario!=undefined ?
                        (<a href={`/detallesProducto/${idUsuario}/${producto._id}`} className='btn btn-secondary'>Ver mas informacion</a>) :
                        (<a href={'/login'} className='btn btn-secondary'>Inicia sesion para ver mas informacion</a>)
                        }
                    </div>
                </div>
            ))}
        </div>
    </div>


    )
}

export default ShowProductosSinLogin