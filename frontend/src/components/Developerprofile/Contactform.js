import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

export const Contactform = ({ showForm, setShowform }) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errform, setErrform] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const validnumber = /^[789]\d{9}$/.test(phone);
        if (!validnumber) {
            setErrform('Check the mobile number');
            return;
        }
    
        const whatsappapi = 'https://api.whatsapp.com/send';
        const phonenumber = '7845442450';
        const formattedMessage = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
        const encodeuri = encodeURIComponent(formattedMessage);
        const send = `${whatsappapi}?phone=${phonenumber}&text=${encodeuri}`;
        window.location.href = send;
    };

    return (
        <>
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.2)',
                        borderRadius: '15px',
                        zIndex: 100,
                        width: '90%',
                        maxWidth: '500px',
                        overflow: 'hidden',
                      //  backgroundColor: '#1f2937', // Background color to match form elements
                    }}
                    
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: errform ? 1 : 0, y: errform ? 0 : -20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{
                            color: '#f87171', // Tailwind red-400
                            fontWeight: 'bold',
                            marginBottom: '15px',
                            textAlign: 'center',
                        }}
                    >
                        {errform}
                    </motion.div>
                    <motion.div
                        onClick={() =>{ setShowform(false)
                           setErrform('')}}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            cursor: 'pointer',
                            zIndex: 101,
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.1 }}
                        className='text-rose-600'
                    >
                        <CloseIcon style={{ fontSize: '28px', color: 'red' }} />
                    </motion.div>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#fff' }}>
                        Contact Me
                    </h2>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                                background: 'rgb(30, 41, 59)',
                                color: '#fff',
                            }}
                            onChange={e => setName(e.target.value)}
                            onFocus={(e) => e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'}
                            onBlur={(e) => e.target.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)'}
                        />
                        <input
                            type="number"
                            placeholder="Your Mobile Number"
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                                background: 'rgb(30, 41, 59)',
                                color: '#fff',
                            }}
                            onChange={e => setPhone(e.target.value)}
                            onFocus={(e) => e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'}
                            onBlur={(e) => e.target.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)'}
                        />
                        <textarea
                            placeholder="Your Message"
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginBottom: '20px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                                resize: 'vertical',
                                minHeight: '100px',
                                background: 'rgb(30, 41, 59)',
                                color: '#fff',
                            }}
                            onChange={e => setMessage(e.target.value)}
                            onFocus={(e) => e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'}
                            onBlur={(e) => e.target.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)'}
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '10px',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            
                            }}
                            className='border'
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            )}
        </>
    );
};
