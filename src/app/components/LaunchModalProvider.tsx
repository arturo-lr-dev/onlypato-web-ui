'use client';

import React, { useState, useEffect } from 'react';
import LaunchModal from './LaunchModal';

const LaunchModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mostrar el modal automáticamente al cargar la página
  useEffect(() => {
    // Verificar si el modal ya se ha mostrado en esta sesión
    const hasModalBeenShown = sessionStorage.getItem('launchModalShown');
    
    if (true) {
      // Pequeño retraso para mostrar el modal después de que la página se cargue
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    // Marcar que el modal ya se ha mostrado en esta sesión
    sessionStorage.setItem('launchModalShown', 'true');
  };

  return (
    <>
      {children}
      <LaunchModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LaunchModalProvider;