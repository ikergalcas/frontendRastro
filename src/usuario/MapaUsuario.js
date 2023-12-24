import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';

const ShowMapaUsuario = () => {
    const { idUsuario } = '653fe434b1b1e5d84c3ed746';

    const [geo, setGeo] = useState({});
    const [position, setPosition] = useState([0, 0]);

    //Consulta para obtener la geolocalizacion del producto
    useEffect(() => {
        fetch(`https://backend-rastro.vercel.app/usuarios/ubi/${idUsuario}`)
            .then(response => response.json())
            .then(data => {
                setGeo(data);
                if (data.latitude && data.longitude) {
                    setPosition([data.latitude, data.longitude]);
                }
            })
            .catch(error => {
                console.error('Error al obtener usuario:', error);
            });
    }, [idUsuario]);

    return (
      <div className='container mb-4'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='card-title'> Ubicación del usuario </h2>
            {position[0] !== 0 && position[1] !== 0 && (
            <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                <Popup>
                    Ubicación del usuario
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                </Popup>
                </Marker>
            </MapContainer>
            )}
          </div>
        </div>
    </div>
    );
}

export default ShowMapaUsuario;