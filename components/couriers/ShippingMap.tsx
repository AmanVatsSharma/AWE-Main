import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// mapboxgl.accessToken = 'sk.eyJ1IjoiYW1hbi12YXRzLXNoYXJtYSIsImEiOiJjbTB0c3pyZmUwdnBzMnJzajIxNXM2bjg5In0.BiZJUVhiL8BHVk0HEomnrw'

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbi12YXRzLXNoYXJtYSIsImEiOiJjbTB0c2E0bXcwd2ZiMmlzNTg1NDU5NG5mIn0.z6CzLy2_hJsiFzQTtuWfZg'


interface ShippingMapProps {
    fromZip: string
    toZip: string
}

export default function ShippingMap({ fromZip, toZip }: ShippingMapProps) {
    const mapContainer = useRef(null)
    const map = useRef(null)

    useEffect(() => {
        if (map.current) return // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-98.5795, 39.8283], // center of US
            zoom: 3
        })
    }, [])

    useEffect(() => {
        if (!map.current || !fromZip || !toZip) return

        // This is a placeholder for geocoding. In a real application, you would use a geocoding service to convert ZIP codes to coordinates.
        const fromCoords = [-74.006, 40.7128] // New York City coordinates as placeholder
        const toCoords = [-118.2437, 34.0522] // Los Angeles coordinates as placeholder

        map.current.flyTo({
            center: [(fromCoords[0] + toCoords[0]) / 2, (fromCoords[1] + toCoords[1]) / 2],
            zoom: 4,
            speed: 0.8,
            curve: 1,
        })

        new mapboxgl.Marker().setLngLat(fromCoords).addTo(map.current)
        new mapboxgl.Marker().setLngLat(toCoords).addTo(map.current)

        map.current.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [fromCoords, toCoords]
                }
            }
        })

        map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 8
            }
        })
    }, [fromZip, toZip])

    return (
        <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Route</h2>
            <div ref={mapContainer} className="h-96 rounded-lg" />
        </div>
    )
}