import React, { useState, useEffect, useRef} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";

const CompPago = () => {
    
    const paypal = useRef()
    const { idUsuario, idProducto } = useParams()
    const [huellaCarbono, setHuellaCarbono] = useState()
    const [vendedor, setVendedor] = useState()
    const [comprador, setComprador]=useState()
    const [producto, setProducto] = useState(null)
    const [transporte,setTransporte] = useState(null)
    const [extraHuella, setExtraHuella] =useState(null)
    const [precioFinal,setPrecioFinal] = useState (null)
    
    useEffect(() => {
        getDatos()  
    }, []) 
    
    useEffect(() => {
        if (producto) {

            paypal.current.innerHTML = '';

            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create ({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: producto.titulo,
                                amount: {
                                    currency_code: "EUR",
                                    value: (precioFinal)
                                }
                            }
                        ],
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await (actions.order.capture())
                    aniadirComprador()
                    console.log(order)
                },
                onError : (err) => {
                    alert("Ha habido algun fallo con la compra")
                    console.log(err)
                }
            }).render(paypal.current)
        }
    }, [precioFinal]);

    const aniadirComprador = async () =>{
        var raw = JSON.stringify({
            "comprador": idUsuario,
          });

        fetch(`https://backend-rastro.vercel.app/productos/${idProducto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
          .then(result => {
                console.log(result)
                alert ("Compra realizada con exito")
                window.location.href = `/myUserInfo/${idUsuario}`;
            })
            .catch(error => {
                console.error('Error al crear producto:', error);
            });
    }   

    const getDatos = async () =>{
        if(transporte== undefined){
            setTransporte("camion")
        }
        var raw = JSON.stringify({
            "idComprador" : idUsuario,
            "idProducto" : idProducto,
            "transporte" : transporte
        })

        fetch('https://backend-rastro.vercel.app/productos/huellaCarbonoNuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setProducto(data.producto)
            setVendedor(data.vendedor)
            setComprador(data.comprador)
            setHuellaCarbono(data.huellaCarbono)
            setExtraHuella (data.huellaCarbono * 0.01)
            setPrecioFinal(data.producto.maximaPuja + data.huellaCarbono * 0.01)
            console.log(data.producto)
            console.log(data.vendedor)
           // console.log(data.huellaCarbono)
        })
    }

    const getHuella = async () =>{
        if(producto) {
            var raw = JSON.stringify({
                "ubicacionOrigen" : producto.ubicacion,
                "ubicacionDestino" : comprador.ubicacion ,
                "peso" : producto.peso,
                "transporte" : transporte
            })
    
            fetch('https://backend-rastro.vercel.app/productos/huellaCarbono', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: raw
            }).then(response => response.json())
            .then(data => {
                setHuellaCarbono(data.carbon)
                setExtraHuella (data.carbon * 0.01)
                setPrecioFinal(producto.maximaPuja + data.carbon * 0.01)
            })
        }
    }

    useEffect(() => {
        console.log("trasnporte", transporte)
        getHuella()
        console.log("hh", huellaCarbono)
    }, [transporte]);

    const handleSeleccion = async (event) => {
        setTransporte(event.target.value)
    };

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 bg-primary-subtle">
                    <div className="card-header bg-primary-subtle">
                        <h4 className="card-title">Resumen de pago</h4>
                        <div className='card'>
                            <div className='card-body'>
                               <h6>Producto {producto && producto.titulo}</h6>
                               <div className='row no-gutters'>
                                    <div className='col-md-3'>
                                        <img className="card-img" src={producto && producto.foto} style={{width: '100%'}}></img>
                                    </div>
                                    <div className='col-md-7'>
                                        <p>Vendedor: {vendedor && vendedor.username}</p>
                                        <p>Precio: {producto && producto.maximaPuja}€** </p>
                                        <p>Peso:  {producto && producto.peso}gr</p>
                                        <p style={{ fontSize: '60%' }} >**Se aplicará una tasa extra de 0.01€/gr de CO2 consumido en el transporte. 
                                            La cantidad de CO2 consumida depende del peso, la distancia y el medio de transporte</p>
                                    </div>
                               </div>      
                            </div>
                        </div>
                    
                        <div>
                            <h4>Seleccione un medio de transporte:</h4>
                            <form>
                                <label>
                                <input type="radio" value="avion" checked={transporte === 'avion' } 
                                onChange={handleSeleccion}/>
                                Avion </label>

                                <label>
                                <input type="radio" value="tren" checked={transporte === 'tren' } 
                                onChange={handleSeleccion} />
                                Tren </label>

                                <label>
                                <input type="radio" value="camion" checked={transporte === 'camion' } 
                                onChange={handleSeleccion} />
                                Camion </label>

                                <label>
                                <input type="radio" value="barco" checked={transporte === 'barco'}  
                                onChange={handleSeleccion} />
                                Barco
                                </label>
                            </form>
                            <br/>
                            <p>Huella de carbono: {huellaCarbono} gr de CO2</p>
                            <p>Coste extra por huella: {extraHuella}€</p>
                            <h4>Precio Total: {precioFinal}€</h4>
                        </div>
                    </div>
                    </div>
                    <div className="card col bg-light">
                        <div className="card-body">
                            <h5>Credenciales pago paypal:</h5>
                            <p>Correo: sb-bgakd28873605@personal.example.com </p>
                            <p>Contraseña: 5U(^dThf </p>
                            <div ref={paypal}></div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default CompPago