import { useState } from 'react';

export default function PromoHeader() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-3 text-sm font-medium">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 text-center">
            <span>
              <strong>¡Oferta especial!</strong> Obtén un 30% de descuento en toda la tienda
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-blue-200 mt-1 sm:mt-0">
              Código: <strong className="text-white">DESCUENTO30</strong>
            </span>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 px-2 py-1 text-xs hover:bg-blue-700 rounded transition-colors duration-200"
            aria-label="Cerrar banner promocional"
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-white to-blue-400 animate-pulse"></div>
    </div>
  );
}