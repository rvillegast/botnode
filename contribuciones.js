var builder = require('botbuilder');
var http = require('http');
var claveGenerada=0;
var rut=0;

module.exports = [
    //solicita Rut
    function (session){
        session.send('Vamos a Buscar tus Deudas');
        builder.Prompts.text(session, 'Indicame tu Rut para buscar');
    },

    function(session, results, next){
        session.dialogData.rut = results.response;
        rut=results.response;
        session.send('Buscando Deudas para el RUT: %s', results.response);
        next();
    },

    //Solicita Clave

    function(session){
        claveGenerada = parseInt(Math.random() * (9999 - 1000) + 1000);
        console.log('LA CLAVE ES: ' + claveGenerada); //la clave debe ser enviada por correo
        builder.Prompts.text(session, 'Hemos enviado una clave a su correo, ingresala por favor');
    },

    function(session, results, next){
        session.dialogData.clave = results.response;
        next();
    },


    //Busca Datos

    function(session){
        var claveIngresada = session.dialogData.clave;

        if (claveIngresada == claveGenerada){
            //llamada al api
            http.get('http://localhost/bot/api/consulta.php?a=deudas&rut=' + session.dialogData.rut , (resp) => {
           // http.get('http://www.mocky.io/v2/5b5b2e79310000de0e9a8b2b' , (resp) => {
            let data = '';

            resp.on ('data', (chunk) => {
                data += chunk;
                console.log('datos del json: ' +  data);
            
                //meto todo a un objeto
                var deudas = JSON.parse(data);
            
                var totalDeuda = 0;

                for (var i=0; i < deudas.length; i++)            {

                    totalDeuda += parseInt(deudas[i].monto);
                }

                session.send('Usted tiene un total de %s deudas', deudas.length);
                session.send('Su deuda total asciende a %s pesos', totalDeuda);
            });

                    // The whole response has been received. Print out the result.
              resp.on('end', () => {
                console.log(JSON.parse(data).explanation);
              });

            }).on("error", (err) => {
              console.log("Error: " + err.message);
            });

        }
       


        else{
            session.send('Su clave es erronea, hemos finalizado la conversacion');
        }
        

    
    }

]