import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const CompShowComentarios = () => {
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
        fetch(`http://localhost:3001/productos/${idProducto}`, {
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

    //conseguimos los comentarios de un producto
    const [comentarios, setComentarios] = useState({});
    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`http://localhost:3001/productos/${idProducto}/comentarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los comentarios obtenidos
                setComentarios(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener los comentarios:', error);
            });
    },[]);

    const crearComentario = async (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        console.log('Creando comentario...');
    
        // Obtener el valor del precio del formulario
        const textoComentario = document.getElementById("texto").value;
        console.log('El comentario es:', textoComentario);
    
        // Crear el objeto de datos para la solicitud
        const datosComentario = {
            "usuario": idUsuario,
            "texto": textoComentario, // Convertir el valor a número si es necesario
        };
        console.log('Datos de la puja:', datosComentario);
    
           // Convertir los datos a formato raw
            const rawDatosComentario = JSON.stringify(datosComentario);

        // Realizar la solicitud al backend
        fetch(`http://localhost:3001/productos/${idProducto}/crearComentario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: rawDatosComentario, // Enviar datos en formato raw
        })
        .then(response => response.json())
        .then(data => {
            console.log('Comentario realizado con éxito:', data);
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario7
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al realizar el comentario:', error);
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario

        });
    }

        // Inicializar respuestas con un array vacío del mismo tamaño que comentarios
        const [respuestas, setRespuestas] = useState(new Array(comentarios.length).fill(''));

        // Manejar cambios en las respuestas
            const handleRespuestaChange = (index, value) => {
            const nuevasRespuestas = [...respuestas];
            nuevasRespuestas[index] = value;
            setRespuestas(nuevasRespuestas);
            };

        const handleComentarioSubmit = async (event, comentarioId, index) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        console.log('Creando respuesta...');
    
        const respuestaComentario = respuestas[index];
        const idComentario = comentarioId;

        console.log('La id del comentario es: ', idComentario);

        // Aquí puedes enviar la respuesta al backend junto con la comentarioId
        console.log('La respuesta es:', respuestaComentario);

        // Crear el objeto de datos para la solicitud
        const datosRespuesta = {
            "respuesta": respuestaComentario, // Convertir el valor a número si es necesario
        };
        console.log('Datos de la respuesta:', datosRespuesta);
    
           // Convertir los datos a formato raw
            const rawDatosRespuesta = JSON.stringify(datosRespuesta);

            // Realizar la solicitud al backend
        fetch(`http://localhost:3001/productos/${idProducto}/crearRespuestaComentario/${idComentario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: rawDatosRespuesta, // Enviar datos en formato raw
        })
        .then(response => response.json())
        .then(data => {
            console.log('Comentario actualizado con éxito:', data);
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario7
            window.location.reload();
            const nuevasRespuestas = [...respuestas];
            nuevasRespuestas[index] = '';
            setRespuestas(nuevasRespuestas);
        })
        .catch(error => {
            console.error('Error al actualizar el comentario:', error);
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario

        });
    }

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Obtener información de usuario para cada puja
        const obtenerUsuarios = async () => {
            if (Array.isArray(comentarios)) {
        const usuariosPromises = comentarios.map((comentario) =>
            fetch(`http://localhost:3003/usuarios/${comentario.usuario}`).then((res) => res.json())
        );

        const usuariosData = await Promise.all(usuariosPromises);
        setUsuarios(usuariosData);
            }else{
                console.error('El estado comentarios no es un array.');
                // Puedes agregar lógica adicional aquí si es necesario
            
            }
        };

        obtenerUsuarios();
    }, [comentarios]);

       //---BORRAR PUJa---
       const borrarComentario = (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario
        const idComentario = document.getElementById("idComentario").value;
        console.log(idComentario);
        //const formElements = event.target.elements;
        //const idPuja = document.getElementById("idPuja").value;
        //const idUsuario = event.target.elements.namedItem("idVendedor").value;
        navigate(`/borrarComentario/${idUsuario}/${idProducto}/${idComentario}`)
        
    }

    //METER LA LISTITA DE COMENTARIOS
    return (

        <div>
        {producto.vendedor !==  idUsuario && (
            <div>
                <div class="buscador-center col 4">
                <form
                    id="formularioComentario"
                    className="buscador-center"
                    onSubmit={crearComentario}
                >
                    <input
                    className='barrabusquedabig'
                    type="text"
                    id="texto"
                    name="texto"
                    placeholder="Comentario"
                    required
                    />
                    <button className="botonBusqueda col 1" type="submit">Comentar</button>
                </form>
                </div>
            </div>
            )}
        <b>COMENTARIOS</b>
                <div class="card" style={{width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '5%'} }>
            <div class="card body" >
                {Array.isArray(comentarios) && comentarios.length > 0 ? (
                <ul class="list-group list-group-flush">
                    {comentarios.map((comentario, index) => (
                    <li key={index} class="list-group-item">
                        <p>
                        {comentario.usuario === idUsuario ? (
                            <b>Usuario: Yo</b> 
                        ) : (
                            <b>Usuario: Anonymous</b> 
                        )}
                        </p>
                        <p><b>Comentario: </b>{comentario.texto}</p>
                        {comentario.respuesta !== "" && ((producto.vendedor === idUsuario) || (comentario.usuario === idUsuario))&& (
                        <p>
                            <b>Respuesta: </b> {comentario.respuesta}
                        </p>
                        )}
                        <p>
                              {//---Borrar coment---//
                                        //Puedo borrar la puja si soy el creador
                                        //      <input type="hidden" name="idUsuario" value={producto.vendedor} />
                                        //             <input type="hidden" name="idPuja" value={puja._id} />

                                        idUsuario == comentario.usuario && (
                                            <form onSubmit = {borrarComentario}>
                                                <input type="hidden" name="idComentario" id="idComentario" value={comentario._id} />
                                                <button className='btn btn-secondary' type='submit'><i className="fa fa-trash"></i></button>
                                            </form>
                                        )}
                        </p>
                        {producto.vendedor === idUsuario && comentario.respuesta === "" && (
                            <form
                            id={`crearRespuesta${index}`}
                            className="buscador-center"
                            onSubmit={(e) => handleComentarioSubmit(e, comentario._id, index)}
                        >
                            <input
                                type="text"
                                placeholder="Respuesta"  
                                value={respuestas[index]}
                                onChange={(e) => handleRespuestaChange(index, e.target.value)}
                            />
                            <button type="submit">Responder</button>
                            </form>
                        )}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No hay comentarios.</p>
                )}
            </div>
            </div>
    </div>
    );
}

export default CompShowComentarios;