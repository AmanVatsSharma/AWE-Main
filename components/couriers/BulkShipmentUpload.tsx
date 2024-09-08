import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { CloudUploadIcon } from 'lucide-react'
import * as XLSX from 'xlsx'

interface BulkShipmentUploadProps {
    onBulkCreateShipments: (shipmentsData: any[]) => void
}

export default function BulkShipmentUpload({ onBulkCreateShipments }: BulkShipmentUploadProps) {
    const [uploadedData, setUploadedData] = useState<any[]>([])

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)
            setUploadedData(jsonData)
        }

        reader.readAsArrayBuffer(file)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv'],
        },
    })

    const handleSubmit = () => {
        onBulkCreateShipments(uploadedData)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Bulk Shipment Upload</h2>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
            >
                <input {...getInputProps()} />
                <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    Drag and drop your Excel or CSV file here, or click to select a file
                </p>
            </div>
            {uploadedData.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Uploaded Data Preview</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {Object.keys(uploadedData[0]).map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {uploadedData.slice(0, 5).map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value: any, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        Showing {Math.min(5, uploadedData.length)} of {uploadedData.length} rows
                    </p>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Upload {uploadedData.length} Shipments
                    </button>
                </div>
            )}
        </motion.div>
    )
}