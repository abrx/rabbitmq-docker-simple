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
        
        // Le message envoyé est passé en arg au script ou Hello World par défaut
        // Pour la démo il sera envoyé plusieurs fois, directement à une queue puis en passant par un exchange fanout puis avec routing
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        
        // Cas 1: on  utilise l'exchange par défaut qui porte le même nom de la queue cible, sans faire de routage, mais ça pert un peu d'intérêt
        var queue = 'to_review';

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s directly to queue %s", msg, queue);
      
        
        // Cas 2: on déclare l'exchange utilisé => le routage configuré l'enverra sur les bonnes queues, ici à toutes en fanout
        var exchange = 'broadcast2all';

        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Sent %s to exchange %s (fanout)", msg, exchange);
        
        
        // Cas 3: on déclare l'exchange qui est en topic et accepte donc les clés de routage
        var exchange2 = 'videos';
        var routing_key = "videos.dev.youtube"

        channel.publish(exchange2, routing_key, Buffer.from(msg));
        console.log(" [x] Sent %s to exchange %s (topic) with the routing key %s", msg, exchange2, routing_key);

    });

    // Clôture de la connexion et exit
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
