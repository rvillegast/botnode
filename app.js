var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Variables

var UserRut = '';

var DialogLabels = {
    Deudas: 'Deudas',
    Sucursales: 'Sucursales',
    Contribuciones: 'Contribuciones'
};

//Memoria

var inMemoryStorage = new builder.MemoryBotStorage();

// Diagolo del Bot
var bot = new builder.UniversalBot(connector, [
    function (session) {

    //Bienvenida
    builder.Prompts.choice(
        session,
        'Bienvenido a Tesoreria, buscas ayuda con Deudas, Sucursales o Contribuciones',
        [DialogLabels.Deudas, DialogLabels.Sucursales, DialogLabels.Contribuciones],
        {
            maxRetries: 3,
            retryPrompt: 'la seleccionada no es una opcion valida...'
        });
    },

    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! ha intentado muchas veces :(');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Error: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.Deudas:
                return session.beginDialog('deudas');
            case DialogLabels.Sucursales:
                return session.beginDialog('sucursales');
            case DialogLabels.Contribuciones:
                return session.beginDialog('contribuciones');
        }
    }
]).set('storage', inMemoryStorage); // Guarda en Memoria


bot.dialog('deudas', require('./deudas'));
bot.dialog('sucursales', require('./sucursales'));
bot.dialog('contribuciones', require('./contribuciones'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('ha ocurrido un error ', e);
});








