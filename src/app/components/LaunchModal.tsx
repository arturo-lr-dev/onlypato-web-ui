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
        window.gtag('event', 'conversion', {'send_to': 'AW-716306015/Ah3VCJnG5PoYEN_sx9UC'});
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
          <h2 className="text-2xl font-bold mb-2 text-blue-500">¡Próximamente!</h2>
          <p className="text-lg text-blue-500">Abriremos el 5 de septiembre</p>
        </div>
        
        {submitSuccess ? (
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-medium">¡Gracias por suscribirte!</p>
            <p className="text-sm text-gray-600">Te avisaremos cuando abramos.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Recibe una notificación cuando abramos
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                disabled={isSubmitting}
                required
              />
              {submitError && <p className="mt-1 text-sm text-red-600">{submitError}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:opacity-70"
            >
              {isSubmitting ? 'Enviando...' : 'Notifícame'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LaunchModal;