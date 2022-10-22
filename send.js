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
        
        // On déclare une nouvelle queue
        var queue = 'to_review';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });

        // On envoie un message
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });

    // Clôture de la connexion et exit
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
