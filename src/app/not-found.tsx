'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Duck Icon Component
const DuckIcon = ({ size = "normal" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    normal: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <svg 
      className={`${sizeClasses[size as keyof typeof sizeClasses]} text-blue-500`} 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M8.5 5c-1.38 0-2.5 1.12-2.5 2.5 0 .28.06.54.14.79C4.84 8.29 4 9.12 4 10.5c0 1.38 1.12 2.5 2.5 2.5h11c1.38 0 2.5-1.12 2.5-2.5S18.88 8 17.5 8c-.17 0-.33.02-.49.05C16.85 6.84 15.82 6 14.5 6c-.83 0-1.58.4-2.05 1.02C12.17 6.4 11.42 6 10.5 6c-.28 0-.54.06-.79.14C9.44 5.56 9.02 5 8.5 5z"/>
    </svg>
  );
};

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    // Iniciar animación flotante
    setIsFloating(true);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          router.replace('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [router]);

  return (
    <section className="relative min-h-screen py-10 sm:py-16 lg:py-20 px-4 sm:px-6 bg-blue-50 overflow-hidden backdrop-blur-sm bg-opacity-90">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Animated Title */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-blue-600 mb-4">
            {'404'.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block hover:animate-bounce transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  filter: 'drop-shadow(2px 2px 0px rgba(59, 130, 246, 0.2))'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-6">
            {'¡Oops! Esta página se fue volando'.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block hover:animate-bounce transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  filter: 'drop-shadow(1px 1px 0px rgba(59, 130, 246, 0.2))'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

        {/* Floating Duck Container */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div 
            className={`relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-full shadow-2xl border-4 border-white w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center transition-transform duration-1000 ${
              isFloating ? 'animate-bounce' : ''
            }`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 4px 6px rgba(59, 130, 246, 0.1)',
              animationDuration: '2s'
            }}
          >
            {/* Círculo exterior decorativo */}
            <div 
              className="absolute inset-2 rounded-full border-4 border-dashed border-blue-300 opacity-50 animate-spin"
              style={{ animationDuration: '10s' }}
            ></div>
            
            {/* Duck Icon in center */}
            <div className="relative z-10">
              <svg 
                className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8.5 5c-1.38 0-2.5 1.12-2.5 2.5 0 .28.06.54.14.79C4.84 8.29 4 9.12 4 10.5c0 1.38 1.12 2.5 2.5 2.5h11c1.38 0 2.5-1.12 2.5-2.5S18.88 8 17.5 8c-.17 0-.33.02-.49.05C16.85 6.84 15.82 6 14.5 6c-.83 0-1.58.4-2.05 1.02C12.17 6.4 11.42 6 10.5 6c-.28 0-.54.06-.79.14C9.44 5.56 9.02 5 8.5 5z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Message Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-blue-200 max-w-2xl mx-auto mb-8">
          <div className="flex justify-center mb-6 opacity-30">
            <DuckIcon size="large" />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">
            Página no encontrada
          </h3>
          
          <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
            Parece que esta página decidió volar hacia otros cielos. No te preocupes, 
            te llevaremos de vuelta al nido principal.
          </p>
          
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
            ¡Volando de regreso al menú! 🦆
          </div>
          
          {/* Countdown and redirect info */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <p className="text-blue-700 font-medium">
              Redirigiéndote automáticamente en:
            </p>
            <div className="text-4xl font-bold text-blue-600 mt-2">
              {countdown}
            </div>
          </div>
          
          {/* Manual redirect button */}
          <button 
            onClick={() => router.replace('/')}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#FDBB43] to-[#fca311] rounded-full hover:from-[#fca311] hover:to-[#fb8500] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Volver al inicio ahora</span>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3 12h18m-9-9l9 9-9 9" 
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-[#FDBB43] transform scale-0 group-hover:scale-110 transition-transform duration-300 opacity-20"></div>
          </button>
        </div>

        {/* Decorative ducks */}
        <div className="flex justify-center space-x-8 opacity-20">
          <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <DuckIcon size="normal" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
            <DuckIcon size="normal" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
            <DuckIcon size="normal" />
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-pulse">
        <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-40 left-20 opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>
        <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 opacity-30">
        <svg viewBox="0 0 1200 120" className="w-full h-12 sm:h-16 fill-blue-200">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}