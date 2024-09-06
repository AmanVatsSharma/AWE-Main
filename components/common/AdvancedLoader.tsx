import React from 'react'
import { motion } from 'framer-motion'

export default function AdvancedLoader() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <svg width="450" height="80" viewBox="0 0 450 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.text
                        x="10"
                        y="60"
                        className="text-6xl font-bold"
                        fill="#4CAF50"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Pro
                    </motion.text>
                    <motion.text
                        x="110"
                        y="60"
                        className="text-6xl font-bold"
                        fill="#333333"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        Merchants
                    </motion.text>
                </svg>

                <motion.div
                    className="mt-8 w-96 h-2 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ opacity: 1 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                <motion.p
                    className="mt-4 text-gray-600 font-medium text-xl"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    Loading your marketplace...
                </motion.p>
            </motion.div>
        </div>
    )
}