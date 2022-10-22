#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// On se connecte au Rabbitmq server sur localhost
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    // On crée une channel, une connexion logique vers le Rabbitmq
    // Cela permet de partager plusieurs channel (découpage logique) sur une même connexion TCP. 
    // Les channels actives sont visibles sur l'IHM de management

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        
        // On déclare la queue utilisée
        // Ici on utilise l'exchange par défaut qui porte le même nom de la queue, sans faire de routage
        var queue = 'to_review';

        // Le message envoyé est passé en arg au script ou Hello World par défaut
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        // On envoie un message directement à une queue, sans utiliser le routage
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    // Clôture de la connexion et exit
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
