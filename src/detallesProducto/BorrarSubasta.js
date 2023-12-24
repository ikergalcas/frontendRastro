import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CompBorrarSubasta = () => {
    const {idProducto, idUsuario} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3001/productos/${idProducto}`, {
            method: 'DELETE',
        }).then(data => {
            window.location.href=`/productos/${idUsuario}`
        })
    })

    return (
        <div>
            <h3>BORRANDO SUBASTA...</h3>
        </div>
    )
}

export default CompBorrarSubasta