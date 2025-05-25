import React, { useState, useEffect } from 'react';

const LiquidBlueButton = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
    
    console.log('Liquid CTA Button clicked!');
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        {/* Subtle glow ring */}
        <div className={`
          absolute -inset-2 rounded-full
          bg-gradient-to-r from-blue-400/20 to-blue-600/20
          transition-all duration-1000 ease-out
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          ${isHovered ? 'scale-110 opacity-40' : ''}
        `}></div>

        {/* Main liquid button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            group relative overflow-hidden
            inline-flex items-center justify-center
            px-10 py-4 text-lg font-semibold text-white
            bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500
            rounded-full
            transition-all duration-700 ease-out
            transform-gpu
            ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'}
            ${isHovered ? 'scale-105 shadow-lg shadow-blue-500/30' : ''}
            active:scale-95 active:duration-150
          `}
          style={{
            backgroundSize: '200% 100%',
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
          }}
        >
          {/* Liquid wave effect */}
          <div className={`
            absolute inset-0 
            bg-gradient-to-r from-blue-400/30 via-transparent to-blue-400/30
            transition-all duration-1000 ease-in-out
            ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
          style={{
            backgroundSize: '200% 100%',
            animation: isHovered ? 'wave 2s ease-in-out infinite' : 'none'
          }}></div>

          {/* Morphing liquid blob */}
          <div className={`
            absolute inset-1 rounded-full
            bg-gradient-to-br from-blue-300/20 to-blue-700/20
            transition-all duration-500 ease-out
            ${isHovered ? 'scale-110 opacity-100' : 'scale-0 opacity-0'}
          `}
          style={{
            borderRadius: isHovered ? '60% 40% 30% 70%/60% 30% 70% 40%' : '50%',
            animation: isHovered ? 'morph 4s ease-in-out infinite' : 'none'
          }}></div>

          {/* Button content */}
          <span className="relative z-10 flex items-center gap-3">
            <span className={`
              transition-all duration-500 ease-out
              ${isLoaded ? 'translate-x-0' : '-translate-x-2'}
              ${isHovered ? 'tracking-wide' : ''}
            `}>
              Explora
            </span>
            
            <div className={`
              transition-all duration-300 ease-out
              ${isHovered ? 'translate-x-1' : 'translate-x-0'}
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}>
              <svg 
                className={`
                  w-5 h-5 transition-transform duration-500 ease-out
                  ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                `}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </div>
          </span>

          {/* Click ripples */}
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                animationDuration: '0.8s'
              }}
            ></div>
          ))}

          {/* Subtle inner glow */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-t from-transparent via-white/5 to-white/10
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-60'}
          `}></div>
        </button>

        {/* Floating liquid drops */}
        {isHovered && (
          <>
            <div 
              className="absolute w-1 h-1 bg-blue-300/60 rounded-full animate-bounce"
              style={{
                top: '-8px',
                left: '20%',
                animationDelay: '0s',
                animationDuration: '2s'
              }}
            ></div>
            <div 
              className="absolute w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce"
              style={{
                top: '-12px',
                right: '25%',
                animationDelay: '0.7s',
                animationDuration: '2.5s'
              }}
            ></div>
            <div 
              className="absolute w-1 h-1 bg-blue-200/50 rounded-full animate-bounce"
              style={{
                bottom: '-6px',
                left: '70%',
                animationDelay: '1.2s',
                animationDuration: '1.8s'
              }}
            ></div>
          </>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            background-position: 0% 50%;
            transform: translateX(-100%);
          }
          50% {
            background-position: 100% 50%;
            transform: translateX(0%);
          }
        }
        
        @keyframes morph {
          0%, 100% {
            border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40%/50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 30% 60% 40%/30% 50% 70% 30%;
          }
          75% {
            border-radius: 40% 70% 30% 60%/40% 70% 60% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default LiquidBlueButton;