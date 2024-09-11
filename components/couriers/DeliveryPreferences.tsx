import { useState } from 'react'
import { motion } from 'framer-motion'
import { Switch } from '@headlessui/react'

interface DeliveryPreferencesProps {
    shipment: any
    onUpdatePreferences: (preferences: any) => void
}

export default function DeliveryPreferences({ shipment, onUpdatePreferences }: DeliveryPreferencesProps) {
    const [preferences, setPreferences] = useState(shipment.deliveryPreferences)

    const handleChange = (key: string, value: boolean) => {
        setPreferences({ ...preferences, [key]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onUpdatePreferences(preferences)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Delivery Preferences</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Require Signature</span>
                    <Switch
                        checked={preferences.signature}
                        onChange={(checked) => handleChange('signature', checked)}
                        className={`${preferences.signature ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${preferences.signature ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Safe Drop-off (if no one is home)</span>
                    <Switch
                        checked={preferences.safeDropOff}
                        onChange={(checked) => handleChange('safeDropOff', checked)}
                        className={`${preferences.safeDropOff ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${preferences.safeDropOff ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Hold at Location</span>
                    <Switch
                        checked={preferences.holdAtLocation}
                        onChange={(checked) => handleChange('holdAtLocation', checked)}
                        className={`${preferences.holdAtLocation ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${preferences.holdAtLocation ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update Preferences
                </button>
            </form>
        </motion.div>
    )
}