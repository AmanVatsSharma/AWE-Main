import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface PackageSimulatorProps {
    shipment: any
}

export default function PackageSimulator({ shipment }: PackageSimulatorProps) {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()

        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        mountRef.current.appendChild(renderer.domElement)

        const geometry = new THREE.BoxGeometry(
            shipment.dimensions.length / 10,
            shipment.dimensions.height / 10,
            shipment.dimensions.width / 10
        )
        const material = new THREE.MeshPhongMaterial({ color: 0xbcbcbc })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        const light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(10, 10, 10)
        scene.add(light)

        camera.position.z = 5

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25
        controls.enableZoom = true

        const animate = () => {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
            if (!mountRef.current) return
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement)
            }
            window.removeEventListener('resize', handleResize)
        }
    }, [shipment])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">3D Package View</h2>
            <div ref={mountRef} className="h-96 w-full" />
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Package Details</h3>
                <p className="text-gray-600">
                    Dimensions: {shipment.dimensions.length} x {shipment.dimensions.width} x {shipment.dimensions.height} cm
                </p>
                <p className="text-gray-600">Weight: {shipment.weight} kg</p>
            </div>
        </motion.div>
    )
}