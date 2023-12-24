import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompLogin = () => {
    const navigate = useNavigate()

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect (() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "243011194761-u3mtrle5guk2nq217ppt4nqcf2m03u8p.apps.googleusercontent.com",
            callback: handleCallBackResponse
        });

        /* global google */
        google.accounts.id.renderButton(
            document.getElementById("singInDiv"),
            {theme: "outline", size:"large"}

        );
        
    }, []);

    function handleCallBackResponse (response){
        console.log("Encode JWT: "+  response.credential)
        fetch(`https://backend-rastro.vercel.app/usuarios/loginToken/${response.credential}`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                /*CODIGO MARTA
                if (data){
                    data.tokenCompleto= response.credential
                    localStorage.setItem('objetoToken', JSON.stringify(data));
                    window.location.href="/"
                    //console.log(JSON.parse(localStorage.getItem('objetoToken')))
                }*/
                if (data){
                    data.token.tokenCompleto= response.credential
                    localStorage.setItem('objetoToken', JSON.stringify(data.token));
                    window.location.href=`/productos/${data.idUser}`
                    //console.log(JSON.parse(localStorage.getItem('objetoToken')))
                } 
                
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    function handleSingOut (e) {
        google.accounts.id.signOut().then(function () {
            console.log('User signed out.');
            });
    }


    return (
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form">
                        <span class="login100-form-title p-b-26">
                            Bienvenid@ a ElRastro
                        </span>
                        <span class="login100-form-title p-b-48">
                            <img src="./favicon.ico" alt="Tu icono" class="login100-form-title-icon"></img>
                        </span>
                        {/* <span class="login100-form-title p-b-48">
                            <i class="zmdi zmdi-font"></i>
                        </span> */}

                        <div class="container-login100-form-btn">
                            <div id='singInDiv'></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompLogin 