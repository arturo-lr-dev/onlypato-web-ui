/**
 * Servicio para interactuar con el CRM de Holded
 */

/**
 * Envía un email al CRM de Holded para registrar un contacto interesado
 * @param email - El email del contacto a registrar
 * @returns Una promesa que se resuelve cuando el email se ha enviado correctamente
 */
export const sendEmailToHolded = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    // Llamamos a nuestro endpoint de API que se encargará de la integración con Holded
    const response = await fetch('/api/holded/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'launch_modal',
        tags: ['interesado_lanzamiento']
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar email a Holded: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true };
  } catch (error) {
    console.error('Error en el servicio de Holded:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error desconocido al contactar con Holded'
    };
  }
};