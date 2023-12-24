import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CompBorrarComentario = () => {
    const { idUsuario, idProducto, idComentario } = useParams();
    const navigate = useNavigate();

    //          <Route path='/borrarComentario/:idUsuario/:idProducto/:idPuja' element={<CompBorrarComentario/>}/>
    // routerProducto.put('/:idProducto/deleteComentario/:idComentario',deleteComentario)

    useEffect(() => {
        console.log("el comentario es" + idComentario);
        fetch(`http://localhost:3001/productos/${idProducto}/deleteComentario/${idComentario}`, {
            method: 'PUT',
        }).then(data => {
            // Redirige al usuario después de borrar la puja
            navigate(`/detallesProducto/${idUsuario}/${idProducto}`);
        });
    }, []); // Array de dependencias vacío

    return (
        <div>
            <h3>BORRANDO COMENTARIO...</h3>
        </div>
    );
}

export default CompBorrarComentario;