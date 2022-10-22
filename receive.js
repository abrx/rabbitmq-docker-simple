#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// On se connecte au Rabbitmq
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    // On ouvre un channel de connexion
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        // On déclare la queue qu'on va scruter
        var queue = 'to_review';
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        // On s'abonne à la queue grâce à un callback envoyé à la queue par channel.consume et on affiche les messages reçus
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});