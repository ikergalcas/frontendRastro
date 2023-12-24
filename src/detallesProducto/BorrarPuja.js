import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CompBorrarPuja = () => {
    const { idUsuario, idProducto, idPuja } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(idPuja);
        fetch(`http://localhost:3001/productos/${idProducto}/deletePuja/${idPuja}`, {
            method: 'PUT',
        }).then(data => {
            // Redirige al usuario después de borrar la puja
            navigate(`/detallesProducto/${idUsuario}/${idProducto}`);
        });
    }, []); // Array de dependencias vacío

    return (
        <div>
            <h3>BORRANDO PUJA...</h3>
        </div>
    );
}

export default CompBorrarPuja;
