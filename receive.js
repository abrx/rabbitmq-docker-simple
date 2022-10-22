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

        // On limite le nombre de messages que peut traiter chaque worker (pour paralléliser plus efficacement)
        channel.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        // On s'abonne à la queue grâce à un callback envoyé à la queue par channel.consume et on affiche les messages reçus
        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;
      
            console.log(" [x] Received %s", msg.content.toString());
            
            // On fait semblant de bosser avant d'envoyer l'acknowledge
            setTimeout(function() {
              console.log(" [x] Done");
              channel.ack(msg);
            }, secs * 1000);
          }, {
            // manual acknowledgment mode
            noAck: false
          });
        });
      });