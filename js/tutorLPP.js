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
          content: "Actúa como un asistente experto en el lenguaje de programación para principiantes (LPP), creado por el ingeniero Iván Deras. Quiero que me guíes en la escritura, depuración y optimización de código en LPP. Los parámetros de LPP que debes considerar incluyen: Uso de variables con tipos de datos como entero, real, cadena. Instrucciones de entrada/salida: leer, escriba, llamar nueva_linea. Estructuras de control como si...entonces...sino...fin si, según...haga...fin según. Operaciones matemáticas básicas y avanzadas con +, -, *, /, ^ y para igual =. Cálculo de valores y asignación con <-. Manejo de bucles como mientras...haga...fin mientras. Corrige mi código si tiene errores y explícame detalladamente cómo mejorarlo. Si necesitas ejemplos, usa una sintaxis clara y estructurada con explicaciones paso a paso. También quiero que hagas sugerencias para optimizar el código cuando sea posible. este es un ejemplo de un ejercicio de LPP donde cada '-' es un salto de linea y los ''' son comillas dobles sodonde solo es en este caso, ya normal no se usa{real suma,num1,num2,suma1,suma2,suma3,suma4,suma5,suma6 -inicio -escriba 'ingrese un numero : '  -lea num1  -escriba 'ingrese otro numero : '  -lea num2 -si (num1>0) y (num2>0) entonces  -suma<-num1+num2 -escriba  'la suma de positivos es :' -suma -sino -si (num1>0) y  (num2<0) entonces -suma1<-(num1+(-num2)) -escriba  'la suma de positivos y negativos es :   ,suma1 -sino -si (num1<0) y( num2>0) entonces  -suma2<-((-num1)+num2) -escriba 'suma de positivos y negativos :  , suma2 -sino -si (num1<0) y (num2<0) entonces  -suma3<-num1+num2 -escriba  'la suma de negativos es : ' , suma3 -fin si -fin si -fin si -fin si -fin} Mi primer pregunta es: "
        },
        {
          role: "user",
          content: "estudiante de LPP (sudocodigo)"
        }
      ],

      temperature: 0, // Controla la creatividad (0 = preciso, 1 = creativo)
      top_p: 0.5 // Controla la diversidad de las respuestas
    } )
  };


  // Hacer la solicitud a la API
  fetch( apiUrl, requestOptions )
    .then( response => response.json() )
    .then( data => {
      let botResponse = data.choices[ 0 ].message.content;

      // Eliminar el formato \boxed{}
      botResponse = botResponse.replace( /\\boxed\{([^}]+)\}/g, '$1' );

      // Reemplazar saltos de línea por <br> para HTML
      botResponse = botResponse.replace( /\n/g, '<br>' );

      // Aplicar formato con <pre> para mantener espacios y saltos de línea
      responseDiv.innerHTML = `<p><strong>Aladin:</strong></p><pre>${ botResponse }</pre>`;
    } )
    .catch( error => {
      console.error( 'Error:', error );
      responseDiv.innerHTML = '<p>Hubo un error al procesar tu solicitud.</p>';
    } );

}