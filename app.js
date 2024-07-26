const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const Mysqladater = require('./mysql2.js')
const apiService = require('./src/services/producto.service.js')
const service = new apiService();
const consultaService = require('./src/services/consulta.service.js')
const consulta = new consultaService();

/*fetch('https://api.ejemplo.com/datos')
  .then(response => response.json())
  .then(data => {
    // Manipular los datos recibidos de la API
    console.log(data);
  })
  .catch(error => console.error('Error al consumir la API: ', error));*/

let resRequisito;
let item1=[];
let item2=[];
let idProducto, tipoInmueble ;
let arr;
    const flowSecundario = addKeyword(['']).addAnswer([
      
      '📄 Aquí tenemos el flujo secundario'],null,
       async (ctx) => {
        console.log('ingreso al flujo dos')
        console.log(ctx)

        const numeroDeWhatsapp = ctx.from 
        mensajeRecibido = ctx.body 
        //consulta.consultaDescripcion(mensajeRecibido);
        consulta.consultaDescripcion(mensajeRecibido).then(val =>{return val} )
       

      })



    

    const flowDocs = addKeyword(['Info', 'informacion', '2']).addAnswer(
      ['📄 Claro que sí, cuéntame en qué inmueble estás interesado, ¿en qué ubicacion lo requiere?'],
      
      {capture:true  },
      
      async (ctx,{flowDynamic}) =>{
        
        const ubicacion=ctx.body;
        const respuesta= await consulta.consultaUbicacion(ubicacion);
        ///const mapeoDeLista = respuesta.map((item) => item.idproducto).join(',')
        //const mapeoDeLista2 = respuesta.map((item) => item.tipoInmueble).join(',')
        respuesta.forEach(objeto => {
          item1.push(`ID del Inmueble: ${objeto.idproducto}`);
          item1.push(`Tipo de Inmueble: ${objeto.tipoInmueble}`);
         // item1.push(`Tipo de Inmueble: ${objeto.foto}`);
         // item2.push(item1);
         console.log(item1);
      })
     /* for (let i = 0; i < item1.length; i+=2) {
        idProducto = item1[i].split(":")[1].trim(); // Extraer el valor después de ":"
        tipoInmueble = item1[i + 1].split(":")[1].trim(); // Extraer el valor después de ":"
        arr=[`ID del Producto: ${idProducto}`,`\n Tipo de Inmueble: ${tipoInmueble}`];
        //console.log(`ID del Producto: ${idProducto}, Tipo de Inmueble: ${tipoInmueble}`);
       // [`ID del Producto: ${idProducto}`,`\n Tipo de Inmueble: ${tipoInmueble}`]
        
        console.log(arr);
        
      }*/
    
      return await flowDynamic(item1);
       
        
    })
      
     /* .addAnswer(
       
        [ '🙌 Por favor envia el codigo del producto para brindarte mas detalles?', 'si desea regresar al inicio escribe *menu* '],
        {capture:true},
        
        async (ctx,{flowDynamic, endflow}) =>{
          if(ctx.body=='menu'){
            return endflow([flowPrincipal]);
          }else{
         const codigo=ctx.body;
         const respuesta= await consulta.findid(codigo);
         respuesta.forEach(objeto => {
          res1=(`ID del Inmueble: ${objeto.idproducto}`);
          res2=(`Tipo de Inmueble: ${objeto.tipoInmueble}`);
          res3=(`Descripción: ${objeto.descripcion}`);
          // ... imprimir más propiedades según sea necesario
          
         } )
        }
        return  await flowDynamic([res1,res2,res3]);
         
        })
*/
  /*      .addAnswer(
       
          [ '🙌 Si estas interesado en inmueble envia la palabra *Si* de lo contrario envia la palabra *No*? '],
          {capture:true},
          
          async (ctx,{flowDynamic, endflow}) =>{
            if(ctx.body=='No'){
              return endflow([flowPrincipal]);
            }
         
          return  await flowDynamic(['Elige una opcion para enviarte los requisitos', '*pensionado*','*empleado*','*independiente*']);
           
          })
          .addAnswer(
       
            ['Ennvia la opcion mas acorde'],
            {capture:true},
            
            async (ctx,{flowDynamic, endflow}) =>{
             console.log(ctx.body,ctx);
              if(ctx.body=='pensionado'||ctx.body== '1'){
                 resRequisito='Desprendibles de la mesada, Cédulas y un codeudor con estabilidad laboral o con propiedad raíz';
              }else if(ctx.body=='empleado'||ctx.body=='2'){
                 resRequisito='Carta Laboral, últimos desprendibles de pago, cédulas y un codeudor con estabilidad laboral o con propiedad raíz'
              }else if(ctx.body=='independiente'||ctx.body=='3'){
                 resRequisito='Cámara de comercio o RUT, extractos bancarios, cédulas y un codeudor con estabilidad laboral o con propiedad raíz'
              }
           console.log(resRequisito);
            return  await flowDynamic(resRequisito);
             
            })
     
  */
  /*
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
      */
  
  const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
      .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
      .addAnswer(
          [
              'te comparto los siguientes links de interes sobre nuestra inmobiliaria',
              '👉 *Info* para ver la informacion del inmueble',
              '👉 *Dis*  para ver los inmuebles disponibles',
              '👉 *Nos*  para ver la infomacion de nuestra empresa',
               //'la ubicacion es:'+ datos.precio,
              
          ],
          null,
          null,
      [] //   [flowDocs, flowGracias, flowTuto, flowDiscord]
          
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
    
    
    
    


 




  



    




