import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { icon } from 'leaflet';


const ShowProductosConLogin = () => {
    const {idUsuario} = useParams()
    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState({})
    const [busqueda, setBusqueda] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [radio, setRadio] = useState('')

    //ICONO DEL MARCADOR DEL PRODUCTO
    const locationIcon = new L.Icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

    //ICONO DEL MARCADOR DEL USUARIO
    const locationIconUser = new L.Icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    })
      
    useEffect(() => {
        getProductos()
    }, []);

    const getProductos = async () => {
        // Hacer la solicitud para obtener productos desde el backend
        // Mostramos todos los productos cuya subasta sigue abierta (vendido = false)
        // Esta consulta tambien nos devuelve 
        fetch(`https://backend-rastro.vercel.app/productos/${idUsuario}/inicio`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                setProductos(data.productos);
                setUsuario(data.usuario);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    
    const buscarProductos = async (e) => {
        e.preventDefault()

        if(busqueda!="" && !precioMax && !radio){   //Busqueda por descripcion
            console.log("desc")
            let raw = JSON.stringify({
                "descripcion": busqueda.toString()
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/descripcion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al filtrar por descripcion:', error);
                });
        }else if (busqueda=="" && precioMax && !radio){     //Busqueda por precioMax
            console.log("precio")
            let raw = JSON.stringify({
                "precio": precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/preciomax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al filtrar por precioMax:', error);
                });
            
        } else if(busqueda == "" && !precioMax && radio) {      //Busqueda por radio
            console.log("radio")
            let raw = JSON.stringify({
                "radio": radio,
                "idUsuario": idUsuario,
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/radio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al filtrar por radio:', error);
                });
        } else if (busqueda!="" && precioMax && radio == 0){     //Busqueda por descripcion y precioMax
            console.log("precio y desc");
            let raw = JSON.stringify({
                "descripcion": busqueda.toString(),
                "precio" : precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/descripcionPrecio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al filtrar por descripcion y precioMax:', error);
                });

        } else if (busqueda!="" && !precioMax && radio){     //Busqueda por descripcion y radio
            console.log("desc y radio");
            let raw = JSON.stringify({
                "radio": radio,
                "idUsuario": idUsuario,
                "descripcion": busqueda.toString()
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/descripcionRadio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al filtrar or descripcion y radio:', error);
                });

        } else if (busqueda == "" && precioMax && radio){     //Busqueda por radio y precioMax
            console.log("radio y precio");
            let raw = JSON.stringify({
                "radio": radio,
                "idUsuario": idUsuario,
                "precio": precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/radioPrecio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });

        } else if (busqueda != "" && precioMax && radio){     //Busqueda por radio, precioMax y descripcion
            console.log("radio y precio");
            let raw = JSON.stringify({
                "radio": radio,
                "idUsuario": idUsuario,
                "precio": precioMax,
                "descripcion": busqueda.toString()
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-rastro.vercel.app/productos/descripcionRadioPrecio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al filtrar por radio, precioMax y descripcion:', error);
                });

        }
        else{
            limpiarSeleccion()
        }
    }

    const limpiarSeleccion = async () =>{
        setBusqueda("");
        setPrecioMax("");
        setRadio("");
        getProductos()
    }


return(
    
    <div className='container'>
        <div className='row'>
            <div className='col' style={{textAlign:'center'}}>
                <h1>ElRastro</h1>
            </div>
        </div>
        <div className="row"> 
            <div className='col 8'>
                {(usuario && usuario.lat !== undefined && usuario.lon !== undefined &&
                 usuario.lat !== 0 && usuario.lon !== 0) ? (
                <div className='card m-3'>
                    <div className='card-body'>
                        <h3 className='card-title'> Mapa de los productos </h3>
                        <MapContainer center={[usuario.lat, usuario.lon]} zoom={13} style={{ height: '400px', width: '95%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[usuario.lat, usuario.lon]} icon={locationIconUser}>
                                <Popup>Tu ubicacion</Popup>
                            </Marker>
                            {productos && productos.map((producto, index) => (
                                <Marker
                                    key={index}
                                    position={[producto.lat, producto.lon]}
                                    icon={locationIcon}  // Agrega el icono personalizado aquí
                                >
                                    <Popup>{producto.titulo}</Popup>
                                </Marker>
                            ))}
                            
                        </MapContainer>
                    </div>
                </div> 
                ) :
                (
                <Link className='btn btn-secondary' to={`/editarPerfil/${idUsuario}`}>Introduce tu ubicacion para visualizar el mapa</Link>
                )}
            </div>
            <div class="buscador col 4">
                <div className='row'>
                    <div className='col'>
                        {usuario && (
                            <div>
                                <h3>Bienvenid@ {usuario.username}</h3> <br></br>
                            </div>
                        )}
                        <form className="form" onSubmit={buscarProductos}>
                            <div className="mb-3">
                            <label htmlFor="precioMax" className="form-label">Precio máximo:</label>
                            <input
                                value={precioMax}
                                onChange={(e) => setPrecioMax(e.target.value)}
                                type="number"
                                className="form-control"
                                id="precioMax"
                                placeholder="Ingrese el precio máximo"
                            /> 
                            </div>
                            <br></br>
                            <div className="mb-3">
                            <label htmlFor="busqueda" className="form-label">Buscar por producto:</label>
                            <input
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                type="text"
                                className="form-control"
                                id="busqueda"
                                placeholder="Ingrese el producto a buscar"
                            />
                            </div>
                            <br></br>
                            <div className="mb-3">
                            <label htmlFor="radio" className="form-label">Buscar por proximidad(km): </label>
                            <input
                                value={radio}
                                onChange={(e) => setRadio(e.target.value)}
                                type="number"
                                className="form-control"
                                id="radio"
                                placeholder="Ingrese el rango de proximidad"
                            />
                            </div>
                            <br></br>
                            <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Buscar</button>
                            <button onClick={limpiarSeleccion} className="btn btn-outline-dark" >Limpiar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="row" style={{justifyContent: 'center'}}>  
            
            {productos.length==0 ? (
                <p> No hay productos que cumplan con los criterios de búsqueda.</p> 
            ) : productos.map(producto => (
                <div class="card tarjeta col-md-3 col-sm-2" >
                    <div className="card-body">
                        <img className="card-img-top" src={producto.foto} alt={producto.titulo} style={{ objectFit: 'contain', height: '25vmin'}} />
                        <h5 className="card-title">{producto.titulo}</h5>
                        <p className="card-text">{producto.descripcion}</p>
                        {producto.pujas.length == 0 ? (
                            <p className='card-text'>Sin pujas, precio inicial: {producto.precioInicial}</p>
                        ):
                        (
                            <p className="card-text">Maxima puja: {producto.maximaPuja}</p>
                        )}
                        
                        <a href={`/detallesProducto/${idUsuario}/${producto._id}`} className='btn btn-secondary'>Ver más informacion</a>
                    </div>
                </div>
            ))}
        </div>
    </div>


    )
}

export default ShowProductosConLogin