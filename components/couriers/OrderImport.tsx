"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

interface OrderImportProps {
    onImport: (platform: string, file: File) => void
}

export default function OrderImport({ onImport }: OrderImportProps) {
    const [platform, setPlatform] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (platform && file) {
            onImport(platform, file)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Import Orders</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="platform">E-commerce Platform</Label>
                    <Select onValueChange={setPlatform} value={platform}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shopify">Shopify</SelectItem>
                            <SelectItem value="woocommerce">WooCommerce</SelectItem>
                            <SelectItem value="magento">Magento</SelectItem>
                            <SelectItem value="bigcommerce">BigCommerce</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="file">Import File (CSV)</Label>
                    <Input id="file" type="file" accept=".csv" onChange={handleFileChange} />
                </div>
                <Button type="submit" disabled={!platform || !file} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Orders
                </Button>
            </form>
        </motion.div>
    )
}