import React, { useState, useEffect, useRef } from 'react';

export const DuckIcon = ({ size = "normal" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const duckRef = useRef(null);
  
  const sizeClasses = {
    small: "w-8 h-8",
    normal: "w-16 h-16",
    large: "w-20 h-20"
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (duckRef.current) {
        const rect = duckRef.current.getBoundingClientRect();
        const duckCenterX = rect.left + rect.width / 2;
        const duckCenterY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - duckCenterX;
        const deltaY = e.clientY - duckCenterY;
        
        // Limitar el movimiento de los ojos dentro del área del pato
        const maxDistance = 4; // píxeles máximos que se pueden mover los ojos
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        let eyeX = 0;
        let eyeY = 0;
        
        if (distance > 0) {
          eyeX = (deltaX / distance) * Math.min(distance, maxDistance * 10) / 10;
          eyeY = (deltaY / distance) * Math.min(distance, maxDistance * 10) / 10;
        }
        
        setMousePos({ x: eyeX, y: eyeY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={duckRef} className={`${sizeClasses[size]} relative`}>
      {/* Duck body */}
      <div className="absolute inset-0 bg-white rounded-full border-2 border-blue-500"></div>
      
      {/* Duck beak */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0"
           style={{
             borderLeft: '6px solid transparent',
             borderRight: '6px solid transparent',
             borderBottom: '8px solid #f59e0b'
           }}>
      </div>
      
      {/* Duck eyes - now following mouse */}
      <div 
        className="absolute top-1/3 left-1/3 w-2 h-2 bg-black rounded-full transition-transform duration-100"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      ></div>
      <div 
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-black rounded-full transition-transform duration-100"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      ></div>
      
      {/* Small highlight on beak */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
    </div>
  );
};

// Componente de demostración
export default function DuckDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">¡Mueve el ratón!</h1>
      
      <div className="flex gap-8 items-center">
        <DuckIcon size="small" />
        <DuckIcon size="normal" />
        <DuckIcon size="large" />
      </div>
      
      <p className="text-gray-600 mt-8 text-center max-w-md">
        Los ojos de los patos siguen el cursor del ratón. ¡Prueba moviendo el ratón por la pantalla!
      </p>
    </div>
  );
}