const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // Obtener el mensaje del usuario
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    // Configurar la solicitud a OpenRouter
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'cognitivecomputations/dolphin3.0-mistral-24b:free',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          'HTTP-Referer': 'https://your-site-url.com', // Reemplaza con tu URL
          'X-Title': 'My Chatbot', // Nombre de tu sitio
        },
      }
    );

    // Obtener la respuesta del modelo
    const botResponse = response.data.choices[0].message.content;

    // Devolver la respuesta
    return {
      statusCode: 200,
      body: JSON.stringify({ response: botResponse }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al procesar la solicitud' }),
    };
  }
};
