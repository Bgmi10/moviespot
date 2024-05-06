import React, { useState, useRef } from 'react';
import { Validate } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import '../login.css';

const Login = ({ onAuthentication }) => {
  const [issigninform, setIssignform] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [alert, setAlert] = useState(null);
  const [shimmerError, setShimmerError] = useState(false);

  const SignUP = () => {
    setIssignform(!issigninform);
    setErr(null);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const click = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current ? name.current.value : null;
  
    // Reset previous errors and alerts
    setErr(null);
    setAlert(null);
    setShimmerError(false);
  
    // Validate email and password
    const validationErr = Validate(emailValue, passwordValue);
    if (validationErr) {
      setShimmerError(true);
      setErr(validationErr);
      return;
    }
  
    // Perform Firebase authentication
    try {
      if (!issigninform) {
        await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        await updateProfile(auth.currentUser, { displayName: nameValue })
        setAlert({ type: 'success', message: 'Account created successfully. You can now sign in.' });
        setIssignform(true); // Switch to the sign-in form after successful sign-up
      } else {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        onAuthentication();
        localStorage.setItem('authenticated', JSON.stringify(true));

        navigate('/');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      // Handle specific Firebase error codes
      switch (errorCode) {
        case 'auth/weak-password':
          setErr('Weak password. Please use a stronger password.');
          break;
        case 'auth/email-already-in-use':
          setErr('Email address is already in use. Please use a different email.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setErr('Invalid email or password. Please check your credentials.');
          break;
        default:
          setErr(errorMessage);
          break;
      }
  
      setShimmerError(true);
      setAlert({ type: 'error', message: 'Authentication failed. Please try again.' });
    }
  };
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const emailValue = email.current.value;

    if (emailValue) {
      try {
        await sendPasswordResetEmail(auth, emailValue);
        setAlert({ type: 'success', message: 'Check your mailbox to reset your password.' });
      } catch (error) {
        console.error('Forgot password error:', error.message);
        setAlert({ type: 'error', message: 'Error sending password reset email. Please try again later.' });
      }
    } else {
      setAlert({ type: 'error', message: 'Please enter your email before requesting a password reset.' });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background images */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden">
        {/* Large devices */}
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/32c47234-8398-4a4f-a6b5-6803881d38bf/eed3a573-8db7-47ca-a2ce-b511e0350439/IN-en-20240122-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt=""
          className="w-full h-full z-10 object-cover hidden md:block"
        />

        {/* Small devices */}
        {Array.from({ length: 3 }).map((_, index) => (
          <img
            key={index}
            src="https://assets.nflxext.com/ffe/siteui/vlv3/32c47234-8398-4a4f-a6b5-6803881d38bf/eed3a573-8db7-47ca-a2ce-b511e0350439/IN-en-20240122-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt=""
            className="w-/4 h-3/5 object-cover"
          />
        ))}
      </div>

      {/* Login form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 w-96 bg-opacity-75 bg-black text-white rounded-lg text-center shadow-md relative"
      >
        {/* Logo */}
        <div className="flex space-x-2 mb-4">
          <FaPlay className="text-rose-700 text-2xl animate-pulse" />
          <h1 className="text-xl font-bold text-rose-700">Movie Spot</h1>
        </div>

        {/* Title */}
        <h1 className="font-bold text-3xl py-2">{issigninform ? 'Sign In' : 'Sign Up'}</h1>

        {/* Name input (for Sign Up) */}
        {!issigninform && (
          <input
            type="text"
            placeholder="Name"
            className="p-3 my-3 w-full bg-gray-800 rounded text-white"
            ref={name}
          />
        )}

        {/* Email input */}
        <input
          type="text"
          placeholder="E-mail"
          className="p-3 my-3 w-full bg-gray-800 rounded text-white"
          ref={email}
        />

        {/* Password input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="p-3 my-3 w-full bg-gray-800 rounded text-white pl-10"
            ref={password}
          />

          <div
            className="absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <span className="text-lg">👁️</span>
            ) : (
              <span className="text-lg">👁️‍🗨️</span>
            )}
          </div>
        </div>

        {/* Sign In/Sign Up button */}
        <button
          className="p-3 my-3 bg-rose-700 w-full text-white font-bold rounded cursor-pointer hover:bg-rose-800"
          onClick={click}
        >
          {issigninform ? 'Sign In' : 'Sign Up'}
        </button>
        <p className={`text-red-600 py-2 font-bold text-lg ${shimmerError ? 'animate-shimmer' : ''}`}>
          {err}
        </p>
        {/* Toggle Sign In/Sign Up */}
        <p
          className="py-2 cursor-pointer text-lightgray hover:text-rose-600"
          onClick={SignUP}
        >
          {issigninform
            ? 'New to Movie Spot? Sign Up'
            : 'Already have an account? Sign In'}
        </p>

        {/* Forgot Password link */}
        <div className="flex mt-2 justify-center">
          <a href="/" className="text-sm text-rose-400 hover:underline relative" onClick={handleForgotPassword}>
            {issigninform ? 'Forget Password ?' : ''}
          </a>
        </div>

        {alert && (
          <div className={`relative p-3 my-3 border-l-4 ${alert.type === 'success' ? 'border-green-500' : 'border-red-600'} bg-gray-800 rounded text-white animate-shimmer`}>
            <span className="absolute top-0 bottom-0 right-0 px-3 cursor-pointer" onClick={closeAlert}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            {alert.message}
          </div>
        )}

        {/* Terms of Service and Privacy Policy */}
        <div className="mt-4 text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <a href="/terms-of-service" className="text-white hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" className="text-white hover:underline">
            Privacy Policy
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
