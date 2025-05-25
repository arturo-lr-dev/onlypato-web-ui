'use client';

import React, { useState, useEffect } from 'react';
import { DuckIcon } from './DuckIcon';

export const DuckMenu = ({
  title = "Our Menu",
  subtitle = "Spin the wheel and discover our delicious options",
  menuItems = [
    {
      id: 1,
      name: "Classic Pato Burger",
      description: "Juicy duck burger with special sauce and fresh vegetables",
      price: "$12.99",
      image: "🍔"
    },
    {
      id: 2,
      name: "Pato Wings",
      description: "Crispy duck wings with blue cheese dip",
      price: "$9.99",
      image: "🍗"
    },
    {
      id: 3,
      name: "Duck Noodle Soup",
      description: "Traditional soup with tender duck and fresh noodles",
      price: "$14.99",
      image: "🍜"
    },
    {
      id: 4,
      name: "Pato Tacos",
      description: "Three soft tacos filled with seasoned duck meat",
      price: "$11.99",
      image: "🌮"
    },
    {
      id: 5,
      name: "Duck Salad Bowl",
      description: "Fresh greens with grilled duck and citrus dressing",
      price: "$13.99",
      image: "🥗"
    },
    {
      id: 6,
      name: "Pato Pizza",
      description: "Wood-fired pizza with duck, caramelized onions and herbs",
      price: "$16.99",
      image: "🍕"
    },
    {
      id: 7,
      name: "Duck Curry",
      description: "Spicy curry with tender duck and jasmine rice",
      price: "$15.99",
      image: "🍛"
    },
    {
      id: 8,
      name: "Pato Sandwich",
      description: "Gourmet sandwich with duck breast and avocado",
      price: "$10.99",
      image: "🥪"
    }
  ],
  backgroundColor = "bg-blue-50",
  showDuckDecorations = true
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  // Configuración responsive
  const [screenSize, setScreenSize] = useState('desktop');
  
  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) setScreenSize('mobile');
        else if (window.innerWidth < 1024) setScreenSize('tablet');
        else setScreenSize('desktop');
      }
    };
    
    updateScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);
  
  // Configuraciones por tamaño de pantalla
  const config = {
    mobile: { 
      containerSize: 320, 
      radius: 120, 
      itemSize: 28, 
      iconSize: 'text-xl',
      centerSize: 35,
      arrowSize: 'w-5 h-5',
      arrowPadding: 'p-2'
    },
    tablet: { 
      containerSize: 420, 
      radius: 160, 
      itemSize: 32, 
      iconSize: 'text-2xl',
      centerSize: 45,
      arrowSize: 'w-6 h-6',
      arrowPadding: 'p-3'
    },
    desktop: { 
      containerSize: 520, 
      radius: 200, 
      itemSize: 36, 
      iconSize: 'text-3xl',
      centerSize: 50,
      arrowSize: 'w-6 h-6',
      arrowPadding: 'p-3'
    }
  };
  
  const { containerSize, radius, itemSize, iconSize, centerSize, arrowSize, arrowPadding } = config[screenSize as keyof typeof config];
  const center = containerSize / 2;
  
  const spinToIndex = (targetIndex: any) => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Calcular el ángulo objetivo (el elemento seleccionado debe estar arriba)
    const anglePerItem = 360 / menuItems.length;
    const targetAngle = -targetIndex * anglePerItem;
    
    // Encontrar la rotación más corta
    let newRotation = targetAngle;
    let currentNormalized = rotation % 360;
    if (currentNormalized < 0) currentNormalized += 360;
    
    let targetNormalized = targetAngle % 360;
    if (targetNormalized < 0) targetNormalized += 360;
    
    // Calcular diferencias en ambas direcciones
    let diff1 = targetNormalized - currentNormalized;
    let diff2 = diff1 > 0 ? diff1 - 360 : diff1 + 360;
    
    // Elegir la diferencia más pequeña
    const shortestDiff = Math.abs(diff1) <= Math.abs(diff2) ? diff1 : diff2;
    newRotation = rotation + shortestDiff;
    
    setRotation(newRotation);
    setSelectedIndex(targetIndex);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 1200);
  };
  
  const nextItem = () => {
    spinToIndex((selectedIndex + 1) % menuItems.length);
  };
  
  const prevItem = () => {
    spinToIndex((selectedIndex - 1 + menuItems.length) % menuItems.length);
  };

  return (
    <section className={`relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 ${backgroundColor} overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
            {title.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block hover:animate-bounce transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  filter: 'drop-shadow(2px 2px 0px rgba(59, 130, 246, 0.2))'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-lg sm:text-xl text-blue-500 max-w-2xl mx-auto px-4">{subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Wheel Container */}
          <div className="relative flex-shrink-0">
            {/* Navigation Arrows - Mejorados */}
            <button
              onClick={prevItem}
              disabled={isSpinning}
              style={{left: '75px'}}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-40 
                bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                hover:from-blue-600 hover:to-blue-700 
                rounded-full ${arrowPadding} shadow-xl 
                transition-all duration-300 hover:scale-110 hover:shadow-2xl
                disabled:opacity-50 disabled:cursor-not-allowed
                border-4 border-white`}
            >
              <svg className={arrowSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextItem}
              disabled={isSpinning}
              style={{right: '75px'}}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-40 
                bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                hover:from-blue-600 hover:to-blue-700 
                rounded-full ${arrowPadding} shadow-xl 
                transition-all duration-300 hover:scale-110 hover:shadow-2xl
                disabled:opacity-50 disabled:cursor-not-allowed
                border-4 border-white`}
            >
              <svg className={arrowSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Wheel Container */}
            <div 
              className="relative mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full shadow-2xl border-4 border-white"
              style={{ 
                width: containerSize, 
                height: containerSize,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 4px 6px rgba(59, 130, 246, 0.1)'
              }}
            >
              {/* Círculo exterior decorativo */}
              <div 
                className="absolute inset-2 rounded-full border-4 border-dashed border-blue-300 opacity-50 animate-spin"
                style={{ animationDuration: '20s' }}
              ></div>

              {/* Rueda rotativa */}
              <div
                className="absolute inset-0 rounded-full transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: '50% 50%'
                }}
              >
                {menuItems.map((item, index) => {
                  const anglePerItem = 360 / menuItems.length;
                  const angle = index * anglePerItem;
                  const radian = (angle - 90) * (Math.PI / 180); // -90 para empezar arriba
                  
                  // Posicionar elementos en el círculo
                  const x = center + Math.cos(radian) * radius;
                  const y = center + Math.sin(radian) * radius;
                  
                  const isSelected = index === selectedIndex;
                  
                  return (
                    <div
                      key={item.id}
                      className={`absolute cursor-pointer transition-all duration-500 ${
                        isSelected ? 'z-30' : 'z-20'
                      }`}
                      style={{
                        left: x - itemSize,
                        top: y - itemSize,
                        width: itemSize * 2,
                        height: itemSize * 2,
                        // Counter-rotate para mantener elementos derechos
                        transform: `rotate(${-rotation}deg)`,
                        transformOrigin: 'center'
                      }}
                      onClick={() => !isSpinning && spinToIndex(index)}
                    >
                      <div 
                        className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl border-4 border-white transform scale-125' 
                            : 'bg-white text-blue-500 shadow-lg border-3 border-blue-200 hover:border-blue-400 hover:shadow-xl hover:scale-110'
                        }`}
                        style={{
                          boxShadow: isSelected 
                            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' 
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <span className={iconSize}>{item.image}</span>
                      </div>
                      
                      {/* Número del elemento */}
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isSelected 
                          ? 'bg-white text-blue-500 shadow-lg' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Indicador de selección */}
                      {isSelected && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-blue-500"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Centro de la rueda */}
              <div 
                className="absolute bg-gradient-to-br from-white to-blue-50 rounded-full border-4 border-blue-500 flex items-center justify-center shadow-xl"
                style={{
                  width: centerSize * 2,
                  height: centerSize * 2,
                  left: center - centerSize,
                  top: center - centerSize,
                  zIndex: 40
                }}
              >
                <DuckIcon size={screenSize === 'mobile' ? "small" : "normal"} />
              </div>
            </div>
          </div>

          {/* Selected Item Display */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-blue-200 max-w-md w-full mx-4 sm:mx-0">
            <div className="text-center">
              {/* Selected item image */}
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">
                {menuItems[selectedIndex].image}
              </div>
              
              {/* Decorative duck */}
              <div className="flex justify-center mb-4 sm:mb-6 opacity-30">
                <DuckIcon size="normal" />
              </div>
              
              {/* Selected item details */}
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">
                {menuItems[selectedIndex].name}
              </h3>
              
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                {menuItems[selectedIndex].description}
              </p>
              
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">
                {menuItems[selectedIndex].price}
              </div>
              
              {/* Order button */}
              <button className="w-72 group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <span className="relative z-10 animate-pulse">Order Now</span>
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" 
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-400 transform scale-0 group-hover:scale-110 transition-transform duration-300 opacity-20"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="text-center mt-6 sm:mt-8">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg border-2 border-blue-200">
            <span className="text-blue-500 text-base sm:text-lg font-medium">
              Selected: {selectedIndex + 1} of {menuItems.length} items
            </span>
            {isSpinning && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 opacity-30">
        <svg viewBox="0 0 1200 120" className="w-full h-12 sm:h-16 fill-blue-200">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};