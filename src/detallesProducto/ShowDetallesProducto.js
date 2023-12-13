import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'react-bootstrap';


const CompShowDetallesProducto = () => {
    const {idUsuario, idProducto} = useParams()

    // Obtenemos el producto y el vendedor
    const [producto, setProducto] = useState({});
    const [vendedor, setVendedor] = useState({});
    const [mostrarValoracion, setMostrarValoracion] = useState(false)
    const [calidad, setCalidad] = useState(1)
    const [fiabilidad, setFiabilidad] = useState(1)
    const [valoracionComprador, setValoracionComprador] = useState(1)

    //CARRUSEL
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    //Dentro de un useEffect hacemos las 2 consultas porque las solicitudes http son asincronas y en la
    //segunda consulta uso el atributo vendedor de la primera
    useEffect(() => {
        // Hacer la solicitud para obtener un producto desde el backend 
        fetch(`http://localhost:3001/productos/${idProducto}/checkeo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            // Actualizar el estado con los productos obtenidos
            setProducto(data);

            // Hacer la solicitud para obtener el vendedor
            return fetch(`http://localhost:3003/usuarios/${data.vendedor}`);
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar el estado con el vendedor obtenido
            setVendedor(data);
        })
        .catch(error => {
            console.error('Error al obtener producto o vendedor:', error);
        });
    }, [idProducto]);


    
    const [fotoNueva, setFotoNueva] = useState(null);
    
    const nuevaFoto = async (foto) => {
        const archivos = foto ? [foto] : [];
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('http://localhost:3001/productos/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "foto" : result.imageUrl
                          });
                        fetch(`http://localhost:3001/productos/${idProducto}/nuevaImagen`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            setProducto(result)
                            alert('Imagen Añadida');
                            window.location.reload();
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            console.error('No se seleccionó ningún archivo.');
        }
    };

    //---VALORACION---
    const valorar = () => {
        var raw = JSON.stringify({
            "idUsuario": idUsuario,
            "idProducto": idProducto,
            "fiabilidad": Number(fiabilidad),
            "calidad": Number(calidad),
            "valorComprador": Number(valoracionComprador),
        });
    
        console.log("Antes de la solicitud PUT");
        // Pongo el producto como valorado, recalculo la media de valoración y la actualizo
        fetch('http://localhost:3001/productos/valoracion/calculoValoracion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        })
    }
    
    //---CERRAR PUJA---
    const cerrarPuja = () => {
        var raw = JSON.stringify({
            "idProducto": idProducto,
        });

        fetch(`http://localhost:3001/productos/${idProducto}/cerrarPuja`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        })
    }

    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('http://localhost:3003/usuarios/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "foto" : result.imageUrl
                          });
                        console.log(result.imageUrl)
                        fetch(`http://localhost:3001/productos/${producto._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            window.location.reload();
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            alert("Selecciona una foto");   
            console.error('No se seleccionó ningún archivo.');
        }
        
    }

    return (
        <div className='container' style={{marginTop: '3%'}}>
            <div className='row'>
                <div className='col 4'>
                    <div className='row'>
                        <div className='col'>
                            {idUsuario == vendedor._id ? 
                            <div>
                                {/* CAMBIAR IMAGEN PRINCIPAL */}
                               
                                {/* AÑADIR IMAGEN A LAS SECUNDARIAS 
                                <div className='row'>   
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => nuevaFoto(e.target.files[0])}
                                    />                                  
                                </div>
                                */}
                            </div>
                            
                            : null
                            }
                            <div>
                                <img src={producto.foto} className="card-img-top" style={{ objectFit: 'contain', height: '25vmin', textAlign: 'left'}}/>
                                {idUsuario == vendedor._id ? 
                                <form id="formularioParte2" onSubmit={subirFotoIdentificativa} style={{marginTop: '3%', width: '90%'}}>
                                <div style={{flexdirection: 'row', width:'90%'}} >
                                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg,.jpeg"/>
                                    <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                                </div>
                                </form>
                                : null} 
                            </div> 
                            {/*
                            <Carousel activeIndex={index} onSelect={handleSelect} style={{ maxWidth: '400px' }}>
                                {producto.imagenes && producto.imagenes.map((foto, idx) => (
                                    <Carousel.Item key={idx}>
                                    <img
                                        className="d-block w-100"
                                        src={foto}
                                        alt={`Foto ${idx + 1}`}
                                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                    </Carousel.Item>
                                ))}
                                
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </Carousel>*/
                                }


                            {/* CAROUSEL SIN BOTONES ABAJO 
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                {producto.imagenes && producto.imagenes.map((foto, idx) => (
                                    <Carousel.Item key={idx}>
                                        <img
                                            className="d-block w-50"
                                            src={foto}
                                            alt={`Foto ${idx + 1}`}
                                        />
                                    </Carousel.Item>
                                ))
                            </Carousel>*/}
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col 2'>
                            <div className='card text-center mt-3'>
                                <div className='card-body'>
                                    <h3 className='card-title'>
                                        {/* PROVISIONAL VISTA USUARIO*/}
                                        <Link to={`/vistaUser/${vendedor._id}`} >{vendedor.username}</Link>
                                    </h3>
                                    Valoracion
                                        { /* Mostrar estrellas según la valoracionMedia */
                                        Array.from({ length: vendedor.valoracionMedia }).map((_, index) => (
                                            <span key={index} className="text-warning">&#9733;</span>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className='col 2'></div>
                    </div>
                </div>
                <div className='col 8'>
                    <div className='row'>
                        <div className='col 6'>
                            <h3 className='card-title'>
                                Producto: {producto.titulo}
                            </h3>
                        </div>
                        <div className='col 2'>
                            <h3 className='card-title'>Puja mas alta: {producto.maximaPuja}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="card mb-4 h-100 w-100" style={{marginTop: '5%'}}>
                                <div className='card-body overflow-auto'>
                                    <h6 className='card-title'>
                                        {producto.descripcion} <br/> <br/>
                                        Ubicación: {producto.ubicacion} <br/>  <br/>
                                        Precio Inicial: {producto.precioInicial}
                                    </h6>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        {//----------------EDITAR----------------
                                        idUsuario == vendedor._id ? 
                                        <div>
                                            <Link to={`/editarProducto/${idUsuario}/${idProducto}`} className="btn btn-secondary m-2">Editar</Link>
                                        </div>
                                        : null
                                        }
                                    </div>
                                    <div className='col'>
                                        {//--VALORACION--
                                        //----------------Comprador Valora Vendedor----------------
                                        idUsuario == producto.comprador && !producto.valoracionVendedor ?
                                        <div>
                                            <button className="btn btn-secondary" onClick={() => setMostrarValoracion(true)}>
                                            Dejar Valoración
                                            </button>

                                            {mostrarValoracion && (
                                                <form onSubmit={valorar}>
                                                    <label className='form-label'>Valora del 1 al 5 estos aspectos</label>
                                                    <br/>
                                                    
                                                    <a>Calidad del producto</a>
                                                    <input 
                                                    value={calidad} 
                                                    onChange={(e) => setCalidad(e.target.value)}
                                                    type="number" 
                                                    id="calidad" 
                                                    className='form-control' 
                                                    min="1"
                                                    max="5"
                                                    required
                                                    />
                                                    <br/>

                                                    <a>¿Te ha parecido confiable este vendedor?</a>
                                                    <input 
                                                    value={fiabilidad} 
                                                    onChange={(e) => setFiabilidad(e.target.value)}
                                                    type="number" 
                                                    id="fiabilidad" 
                                                    className='form-control'
                                                    min="1"
                                                    max="5" 
                                                    required/>
                                                    <br/>
                                                    <button className="btn btn-secondary" type="submit" >Enviar valoracion</button>
                                                </form>
                                            )}
                                            
                                        </div>
                                        : null
                                        }
                                        {//--Vendedor valora comprador--
                                        idUsuario == producto.vendedor && !producto.valoracionComprador && producto.vendido ?
                                        <div>
                                            <button className="btn btn-secondary" onClick={() => setMostrarValoracion(true)}>
                                            Dejar Valoración
                                            </button>

                                            {mostrarValoracion && (
                                                <form onSubmit={valorar}>
                                                    <label className='form-label'>Valora del 1 al 5 estos aspectos</label>
                                                    <br/>
                                                    
                                                    <a>¿Cual ha sido tu experiencia con este comprador?</a>
                                                    <input 
                                                    value={valoracionComprador} 
                                                    onChange={(e) => setValoracionComprador(e.target.value)}
                                                    type="number" 
                                                    id="valComp" 
                                                    className='form-control' 
                                                    min="1"
                                                    max="5"
                                                    required
                                                    />
                                                    <br/>

                                                    <button className="btn btn-secondary" type="submit" >Enviar valoracion</button>
                                                </form>
                                            )}
                                            
                                        </div>
                                        : null
                                        }
                                    </div>
                                    <div className='col'>
                                        {//---Cerrar Puja
                                        idUsuario == producto.vendedor && !producto.vendido ? 
                                        <form onSubmit={cerrarPuja}>
                                            <button className='btn btn-secondary' type='submit'>Cerrar Puja</button>
                                        </form>
                                        : null
                                        }
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompShowDetallesProducto;