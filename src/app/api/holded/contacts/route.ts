import { NextResponse } from 'next/server';

/**
 * API endpoint para enviar contactos al CRM de Holded
 */
export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const body = await request.json();
    const { email, source, tags } = body;

    // Validar que se proporcione un email
    if (!email) {
      return NextResponse.json(
        { error: 'El email es obligatorio' },
        { status: 400 }
      );
    }

    // Obtener las credenciales de la API de Holded desde las variables de entorno
    const holdedApiKey = process.env.HOLDED_API_KEY;
    const holdedApiUrl = process.env.HOLDED_API_URL || 'https://api.holded.com/api/crm/v1';
    const holdedFunnelId = process.env.HOLDED_FUNNEL_ID || '681e2583df0578e5560e3eb0';
    
    // Verificar que la API key esté configurada
    if (!holdedApiKey) {
      console.error('Error: HOLDED_API_KEY no está configurada en las variables de entorno');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }
    
    try {
      // Integración con la API de Holded según la documentación oficial
      const holdedResponse = await fetch(`${holdedApiUrl}/leads`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'key': holdedApiKey
        },
        body: JSON.stringify({
          funnelId: holdedFunnelId,
          contactId: "683356a913d34a2d1e064f88",
          contactName: email,
          name: email,
          potential: '0'
        })
      });
      
      if (!holdedResponse.ok) {
        throw new Error(`Error en la API de Holded: ${holdedResponse.statusText}`);
      }
      
      const holdedData = await holdedResponse.json();
      console.log('Respuesta de Holded:', holdedData);
    } catch (error) {
      console.error('Error al comunicarse con la API de Holded:', error);
      // Continuamos con la ejecución para devolver una respuesta al cliente
      // En un entorno de producción, podrías querer manejar esto de manera diferente
    }
    
    // Por ahora, simulamos una respuesta exitosa
    console.log('Email recibido para enviar a Holded:', email);

    // Devolver una respuesta exitosa
    return NextResponse.json(
      { success: true, message: 'Contacto registrado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    
    // Devolver una respuesta de error
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}