import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { GeoAltFill } from 'react-bootstrap-icons'; 

const CompShowMapaProducto = () => {
    const { idProducto } = useParams();

    const [geo, setGeo] = useState({});
    const [position, setPosition] = useState([0, 0]);

    //Consulta para obtener la geolocalizacion del producto
    useEffect(() => {
        fetch(`http://localhost:3001/productos/${idProducto}/ubicacion`)
            .then(response => response.json())
            .then(data => {
                setGeo(data);
                if (data.latitude && data.longitude) {
                    setPosition([data.latitude, data.longitude]);
                }
            })
            .catch(error => {
                console.error('Error al obtener producto:', error);
            });
    }, [idProducto]);

    return (
      <div className='container mb-4'>
        <div className='card' style={{marginRight: '10%'}}>
          <div className='card-body'>
            <h3 className='card-title'> Ubicacion del producto </h3>
            {position[0] !== 0 && position[1] !== 0 && (
            <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* NO CONSIGO METER EL ICONO DE UBICACION EN EL MAKER
                <Marker
                  position={position}
                  icon={L.divIcon({
                    className: 'leaflet-bootstrap-icon', // Usa la clase personalizada aquí
                    html: `<div></div>`, // El contenido no importa aquí porque se definirá en el CSS
                  })}
                >
                */}
                <Marker position={position}>
                <Popup>
                    Ubicacion del producto
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


export default CompShowMapaProducto;
