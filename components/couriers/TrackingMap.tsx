import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface TrackingMapProps {
    shipment: any
}

export default function TrackingMap({ shipment }: TrackingMapProps) {
    const [map, setMap] = useState(null)

    useEffect(() => {
        if (map) {
            const bounds = L.latLngBounds(shipment.trackingHistory.map((event) => [event.latitude, event.longitude]))
            map.fitBounds(bounds)
        }
    }, [map, shipment])

    const customIcon = L.icon({
        iconUrl: '/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: '/marker-shadow.png',
        shadowSize: [41, 41],
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Tracking Map</h2>
            <div className="h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    style={{ height: '100%', width: '100%' }}
                    whenCreated={setMap}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {shipment.trackingHistory.map((event, index) => (
                        <Marker
                            key={index}
                            position={[event.latitude, event.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                <h3 className="font-semibold">{event.status}</h3>
                                <p>{event.location}</p>
                                <p className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                            </Popup>
                        </Marker>
                    ))}
                    <Polyline
                        positions={shipment.trackingHistory.map((event) => [event.latitude, event.longitude])}
                        color="blue"
                        weight={3}
                        opacity={0.7}
                    />
                </MapContainer>
            </div>
        </motion.div>
    )
}