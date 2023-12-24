import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L, { icon } from 'leaflet';

const CompShowMapaProducto = () => {
    const { idProducto } = useParams();

    const [producto, setProducto] = useState({});
    const [position, setPosition] = useState([0, 0]);

    const locationIcon = new L.Icon({
      iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    // En posiciton almaceno la geolocalizacion del producto
    useEffect(() => {
        fetch(`http://localhost:3001/productos/${idProducto}`)
            .then(response => response.json())
            .then(data => {
                setProducto(data);
                if (data.lat && data.lon) {
                    setPosition([data.lat, data.lon]);
                }
            })
            .catch(error => {
                console.error('Error al obtener producto:', error);
            });
    }, [idProducto]);

    return (
      <div className='container m-4'>
        <div className='card' style={{marginRight: '10%'}}>
          <div className='card-body'>
            <h3 className='card-title'> Ubicacion del producto </h3>
            {position[0] !== 0 && position[1] !== 0 && (
            <MapContainer center={position} zoom={14} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={locationIcon} ></Marker>
            </MapContainer>
            )}
          </div>
        </div>
    </div>
    );
}


export default CompShowMapaProducto;
