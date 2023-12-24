import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const CompShowPujas = () => {
    const {idUsuario} = useParams()
    const {idProducto} = useParams()
    const navigate = useNavigate()

    const [producto, setProducto] = useState([]);
    useEffect(() => {
        getProductos()
    }, []);

    const getProductos = async () => {
        console.log(idProducto);
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`https://backend-rastro.vercel.app/productos/${idProducto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setProducto(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener producto:', error);
            });
    }

    const [pujas, setPujas] = useState({});
    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`https://backend-rastro.vercel.app/productos/${idProducto}/pujas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setPujas(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener pujas:', error);
            });

    },[]);


    
    const fechaFormateada = producto.fechaCierre ? producto.fechaCierre.slice(0, 10) : '';

    const crearPuja = async (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        console.log('Creando puja...');
    
        // Obtener el valor del precio del formulario
        const precioPuja = document.getElementById("precio").value;
        console.log('Precio de la puja:', precioPuja);
        
        if(precioPuja>=producto.precioInicial){
            // Crear el objeto de datos para la solicitud
            const datosPuja = {
                "precio": parseFloat(precioPuja), // Convertir el valor a número si es necesario
                "usuario": idUsuario
            };
            console.log('Datos de la puja:', datosPuja);
        
            // Convertir los datos a formato raw
            const rawDatosPuja = JSON.stringify(datosPuja);

            // Realizar la solicitud al backend
            fetch(`https://backend-rastro.vercel.app/productos/${idProducto}/crearPuja`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: rawDatosPuja, // Enviar datos en formato raw
            })
            .then(response => response.json())
            .then(data => {
                console.log('Puja realizada con éxito:', data);
                // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario7
                window.location.reload();
            })
            .catch(error => {
                console.error('Error al realizar la puja:', error);
                // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario

            });
        }else{
            alert("No puedes pujar con un precio menor al inicial")
            document.getElementById("precio").value="" 
        }
    }
    
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Obtener información de usuario para cada puja
        const obtenerUsuarios = async () => {
            // Verificar si pujas es un array antes de continuar
            if (Array.isArray(pujas)) {
                const usuariosPromises = pujas.map((puja) =>
                    fetch(`https://backend-rastro.vercel.app/usuarios/${puja.usuario}`).then((res) => res.json())
                );
    
                const usuariosData = await Promise.all(usuariosPromises);
                setUsuarios(usuariosData);
            } else {
                console.error('El estado pujas no es un array.');
                // Puedes agregar lógica adicional aquí si es necesario
            }
        };
    
        obtenerUsuarios();
    }, [pujas]);

     //---BORRAR PUJa---
     const borrarPuja = (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario
        const idPuja = document.getElementById("idPuja").value;
        console.log(idPuja);
        //const formElements = event.target.elements;
        //const idPuja = document.getElementById("idPuja").value;
        
        //const idUsuario = event.target.elements.namedItem("idVendedor").value;
        navigate(`/borrarPuja/${idUsuario}/${idProducto}/${idPuja}`)
        
    }

    return (
        <div>
            {producto.vendedor !== idUsuario && !producto.vendido && (
            <div className="buscador-center col 4" style={{marginLeft: '10%'}}>
            <form
                id="formularioPuja"
                className="buscador-center"
                onSubmit={crearPuja}
            >
                <input
                    className='barrabusquedabig'
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Euros Puja"
                    required
                />
                <button className="botonBusqueda col 1" type="submit">Pujar</button>
            </form>
            </div>
            )}


            <b style={{marginLeft: '10%'}}>FECHA FINAL DE PUJA:</b> {fechaFormateada}
            <div className="card" style={{width: '90%', marginLeft: '5%', marginRight: '%', marginTop: '5%'}}>
                <div className="card body">
                    {Array.isArray(pujas) && pujas.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {pujas.map((puja, index) => (
                        <li key={index} className="list-group-item">
                            <p>
                            <b>Usuario:</b> <a href={`/userInfo/${idUsuario}/${usuarios[index]?._id}`}>{usuarios[index]?.username}</a>
                            </p>
                            <p>
                            <b>Precio:</b> {puja.precio} €
                            </p>
                            <p>
                            {//---Borrar Puja---//
                                        //Puedo borrar la puja si soy el creador
                                        //      <input type="hidden" name="idUsuario" value={producto.vendedor} />
                                        //             <input type="hidden" name="idPuja" value={puja._id} />

                                        idUsuario == puja.usuario && (
                                            <form onSubmit = {borrarPuja}>
                                                <input type="hidden" name="idPuja" id="idPuja" value={puja._id} />
                                                <button className='btn btn-secondary' type='submit'><i className="fa fa-trash"></i></button>
                                            </form>
                                        )}
                            </p>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>No hay pujas.</p>
                    )}
                </div>
                </div>
        
    </div>
    );
}

export default CompShowPujas;