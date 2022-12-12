import { useState } from 'react'
import { SavedAddress } from '../types'

interface SavedAddressesProps {
    savedAddresses: SavedAddress[]
    onSaveAddress: (address: SavedAddress) => void
    onSelectAddress: (address: SavedAddress) => void
}

export default function SavedAddresses({ savedAddresses, onSaveAddress, onSelectAddress }: SavedAddressesProps) {
    const [newAddress, setNewAddress] = useState<SavedAddress>({ name: '', zipCode: '' })

    const handleSave = () => {
        if (newAddress.name && newAddress.zipCode) {
            onSaveAddress(newAddress)
            setNewAddress({ name: '', zipCode: '' })
        }
    }

    return (
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {savedAddresses.map((address) => (
                    <div key={address.name} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div>
                            <p className="font-medium">{address.name}</p>
                            <p className="text-sm text-gray-600">{address.zipCode}</p>
                        </div>
                        <button
                            onClick={() => onSelectAddress(address)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Use
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    placeholder="Address Name"
                    className="flex-grow border rounded-md p-2"
                />
                <input
                    type="text"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    placeholder="ZIP Code"
                    className="w-32 border rounded-md p-2"
                />
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
    )
}