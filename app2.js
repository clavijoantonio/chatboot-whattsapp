const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const Mysqladater = require('./mysql2.js')
const apiService = require('./src/services/producto.service.js')
const service = new apiService();

/*fetch('https://api.ejemplo.com/datos')
  .then(response => response.json())
  .then(data => {
    // Manipular los datos recibidos de la API
    console.log(data);
  })
  .catch(error => console.error('Error al consumir la API: ', error));*/

let datos=null;

  const init = async () => {
    try {
      const data = await service.findDescripcion('casa de dos pisos');
      // Procesar y mostrar los datos en tu página web
      dato=JSON.stringify(data)
      //console.log(dato);
     return dato
    } catch (error) {
      console.error('Error en init:', error);
    }

  };
   
   init().then(val =>{console.log(val);datos=val} );
  // console.log('los datso son :'+datos);
  // console.log('el precio es:'+datos.precio);
  //init();

//console.log('la ubicaiocn es:  '+ dat);
  
const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
       
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
             'la ubicacion es:'+ datos.precio,
            
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
        
    )
    

const main = async () => {
    const adapterDB = new MockAdapter()
    //const adapterDB = new Mysqladater()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    
   
    QRPortalWeb()
}

main()
