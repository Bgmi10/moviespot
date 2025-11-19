import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCopy, FaCheckCircle, FaQrcode } from 'react-icons/fa';

export const Donate = () => {
    const [copied, setCopied] = useState(false);
    const upiId = "subashchandraboseravi45-2@okhdfcbank";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-20">
            <motion.div 
                className="max-w-md w-full bg-black/60 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Support <span className="text-rose-600">MovieSpot</span>
                    </h1>
                    <p className="text-gray-300 text-sm">
                        Help us keep the platform running and ad-free
                    </p>
                </motion.div>

                <motion.div 
                    className="text-center mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}  
                >
                    <div className="relative inline-block">
                        <img 
                            src="/assets/qr.jpeg" 
                            alt="Payment QR Code" 
                            className="w-48 h-48 mx-auto rounded-2xl shadow-lg border-2 border-gray-700"
                        />
                        <div className="absolute -top-2 -right-2 bg-rose-600 p-2 rounded-full">
                            <FaQrcode className="text-white text-sm" />
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        UPI ID
                    </label>
                    <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                        <span className="flex-1 text-white text-sm font-mono break-all">
                            {upiId}
                        </span>
                        <button
                            onClick={copyToClipboard}
                            className="ml-3 p-2 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors duration-200"
                        >
                            {copied ? (
                                <FaCheckCircle className="text-white text-sm" />
                            ) : (
                                <FaCopy className="text-white text-sm" />
                            )}
                        </button>
                    </div>
                    {copied && (
                        <motion.p 
                            className="text-green-400 text-xs mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            UPI ID copied to clipboard!
                        </motion.p>
                    )}
                </motion.div>

                <motion.div 
                    className="bg-gradient-to-r from-rose-600/20 to-pink-600/20 border border-rose-600/30 rounded-xl p-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="flex items-center mb-2">
                        <FaHeart className="text-rose-600 mr-2" />
                        <h3 className="text-white font-semibold">Thank You!</h3>
                    </div>
                    <p className="text-gray-300 text-xs">
                        Your support helps us provide better streaming experience and add new features to MovieSpot.
                    </p>
                </motion.div>

                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    <p className="text-gray-400 text-xs">
                        Scan QR code with any UPI app or copy the UPI ID above
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};