import { useState } from 'react'
import { motion } from 'framer-motion'
import { SketchPicker } from 'react-color'
import { Switch } from '@headlessui/react'

interface TrackingPageGeneratorProps {
    shipment: any
    onGenerate: (customizations: any) => void
}

export default function TrackingPageGenerator({ shipment, onGenerate }: TrackingPageGeneratorProps) {
    const [customizations, setCustomizations] = useState({
        primaryColor: '#3B82F6',
        logo: null,
        showMap: true,
        showEstimatedDelivery: true,
        customMessage: '',
    })

    const handleColorChange = (color) => {
        setCustomizations({ ...customizations, primaryColor: color.hex })
    }

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setCustomizations({ ...customizations, logo: reader.result })
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onGenerate(customizations)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Tracking Page Generator</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <SketchPicker color={customizations.primaryColor} onChange={handleColorChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "/>
                    {customizations.logo && (
                        <img src={customizations.logo} alt="Uploaded logo" className="mt-2 h-16 object-contain" />
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Show Map</span>
                    <Switch
                        checked={customizations.showMap}
                        onChange={(checked) => setCustomizations({ ...customizations, showMap: checked })}
                        className={`${customizations.showMap ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${customizations.showMap ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Show Estimated Delivery</span>
                    <Switch
                        checked={customizations.showEstimatedDelivery}
                        onChange={(checked) => setCustomizations({ ...customizations, showEstimatedDelivery: checked })}
                        className={`${customizations.showEstimatedDelivery ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${customizations.showEstimatedDelivery ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
                <div>
                    <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Message
                    </label>
                    <textarea
                        id="customMessage"
                        rows={3}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter a custom message for your tracking page"
                        value={customizations.customMessage}
                        onChange={(e) => setCustomizations({ ...customizations, customMessage: e.target.value })}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Generate Tracking Page
                    </button>
                </div>
            </form>
        </motion.div>
    )
}