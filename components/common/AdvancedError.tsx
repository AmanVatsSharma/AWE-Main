import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, RefreshCw, ChevronDown } from 'lucide-react'

interface ErrorComponentProps {
    message: string
    details?: string
    onRetry?: () => void
}

export default function AdvancedError({
    message,
    details = "Please try again or contact support if the problem persists.",
    onRetry
}: ErrorComponentProps) {
    const [showDetails, setShowDetails] = React.useState(false)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <motion.div
                className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <div className="p-6 sm:p-8">
                    <motion.div
                        className="w-16 h-16 mx-auto mb-6 text-red-500"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <AlertCircle size={64} />
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-gray-800 text-center mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Oops! Something went wrong.
                    </motion.h2>

                    <motion.p
                        className="text-center text-gray-600 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {message}
                    </motion.p>

                    {onRetry && (
                        <motion.button
                            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                            onClick={onRetry}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <RefreshCw className="mr-2" size={18} />
                            Try Again
                        </motion.button>
                    )}

                    <motion.button
                        className="w-full mt-4 py-2 text-gray-600 flex items-center justify-center focus:outline-none"
                        onClick={() => setShowDetails(!showDetails)}
                        whileHover={{ color: "#4CAF50" }}
                    >
                        <span className="mr-2">Error Details</span>
                        <motion.div
                            animate={{ rotate: showDetails ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </motion.button>
                </div>

                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-gray-600 text-sm">{details}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}