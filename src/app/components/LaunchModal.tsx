'use client';

import React, { useState, useEffect } from 'react';
import { sendEmailToHolded } from '../services/holdedService';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LaunchModal: React.FC<LaunchModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  function gtag_report_conversion(url: any) {
    var callback = function () {
      
    };
    window.gtag('event', 'conversion', {
        'send_to': 'AW-716306015/Ah3VCJnG5PoYEN_sx9UC',
        'event_callback': callback
    });
    return false;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitError('Por favor, introduce tu email');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Enviar el email al CRM de Holded usando nuestro servicio
      const result = await sendEmailToHolded(email);
      
      if (result.success) {
        gtag_report_conversion('https://www.onlypato.com/');
        setSubmitSuccess(true);
        setEmail('');
        
        // Cerrar el modal después de 3 segundos tras éxito
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(result.message || 'Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setSubmitError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      console.error('Error al enviar email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-500">¡Encuéntranos en!</h2>
          
          <div className="flex flex-col space-y-6 mt-8">
            <a 
              href="https://www.ubereats.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img 
                src="./ubereats.png" 
                alt="Uber Eats" 
                className="h-24 w-auto mx-auto my-4"
              />
            </a>
            {false &&
            <a 
              href="https://www.globo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img 
                src="./globo.png" 
                alt="Globo" 
                className="h-24 w-auto mx-auto my-4"
              />
            </a>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchModal;