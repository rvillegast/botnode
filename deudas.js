module.exports = function (session) {
    session.error('El dialogo de Deudas aun no esta implementado');
};

// var builder = require('botbuilder');
// var http = require('http');

// module.exports = [
//     //solicita Rut
//     function (session){
//         session.send('Vamos a Buscar tus Deudas');
//         builder.Prompts.text(session, 'Indicame tu Rut para buscar');
//     },

//     function(session, results, next){
//         session.dialogData.destination = results.response;
//         session.send('Buscando Deudas para el RUT: %s', results.response);
//         next();
//     },

//     function (clave, results, next) {
//         // session.dialogData.destination = results.response;
//         // session.send('Buscando Deudas para el RUT: %s', results.response);

//         //genero la clave para validar usuario
//         var clave = parseInt(Math.random() * (9999 - 1000) + 1000);
//         console.log('LA CLAVE ES: ' + clave); //la clave debe ser enviada por correo

    
//         builder.Prompts.text(clave, 'Hemos enviado una clave a su correo, ingresala por favor');
//         session.dialogData.clave = results.response;
//         if (results.response == clave)
//         {


//         //llamada al api
//         http.get('http://localhost/bot/api/consulta.php?a=deudas&rut=' + results.response , (resp) => {
//         let data = '';

//         resp.on ('data', (chunk) => {
//             data += chunk;
//             console.log('datos del json: ' +  data);
           
//             //meto todo a un objeto
//             var deudas = JSON.parse(data);
          
//             var totalDeuda = 0;


//             for (var i=0; i < deudas.length; i++)            {

//                 totalDeuda += parseInt(deudas[i].monto);
//             }

           

//             session.send('Usted tiene un total de %s deudas', deudas.length);
//             session.send('Su deuda total asciende a %s pesos', totalDeuda);
//         });

//                 // The whole response has been received. Print out the result.
//           resp.on('end', () => {
//             console.log(JSON.parse(data).explanation);
//           });

//         }).on("error", (err) => {
//           console.log("Error: " + err.message);
//         });
        
       
//     }
//     else{
//         session.send('Su clave es erronea, hemos finalizado la conversacion');
//     }
//     next();
//     },
// ]