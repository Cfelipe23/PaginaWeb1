const apiKey = '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'; // Reemplaza con tu clave de API de OpenRouter
const apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Endpoint de OpenRouter

function sendMessage() {
  const userInput = document.getElementById( 'userInput' ).value;
  const responseDiv = document.getElementById( 'response' );

  // Validar la entrada del usuario
  if ( !userInput ) {
    alert( 'Por favor, escribe algo.' );
    return;
  }

  // Mostrar "Escribiendo..." mientras se procesa la solicitud
  responseDiv.innerHTML = '<p>Escribiendo...</p>';

  // Configurar la solicitud a la API
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ apiKey }`,
      'HTTP-Referer': 'https://tusitio.com', // Opcional. URL de tu sitio para estadísticas.
      'X-Title': 'Mi Chatbot', // Opcional. Título de tu sitio para estadísticas.
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      model: "deepseek/deepseek-r1-zero:free",
      messages: [
        {
          role: "system",
          content: " [Aquí puedes escribir tu consulta o pegar tu código]"
        },
        {
          role: "user",
          content: userInput
        }
      ],

      temperature: 0.7, // Controla la creatividad (0 = preciso, 1 = creativo)
      top_p: 0.9 // Controla la diversidad de las respuestas
    } )
  };

  fetch( apiUrl, requestOptions )
    .then( response => response.json() )
    .then( data => {
      let botResponse = data.choices[ 0 ].message.content;

      // Eliminar el formato \boxed{}
      botResponse = botResponse.replace( /\\boxed\{([^}]+)\}/g, '$1' );

      // Reemplazar saltos de línea por <br> para que se muestren en HTML
      botResponse = botResponse.replace( /\n/g, '<br>' );

      // Mostrar la respuesta con formato correcto
      responseDiv.innerHTML = `<p><strong>Bot:</strong> ${ botResponse }</p>`;
    } )
    .catch( error => {
      console.error( 'Error:', error );
      responseDiv.innerHTML = '<p>Hubo un error al procesar tu solicitud.</p>';
    } );

}