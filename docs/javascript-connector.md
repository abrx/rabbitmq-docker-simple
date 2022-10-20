# Publier et consommer des messages en javascript

La majorité des éléments présentés ici sont adaptés des [tutoriels](https://www.rabbitmq.com/getstarted.html) fournis en opensource par Rabbitmq.

## Librairie utilisée

On se base ici sur la librairie [amqplib](https://github.com/amqp-node/amqplib) utilisée par le client amqp.node de Nodejs, donc la doc est disponible [ici](https://amqp-node.github.io/amqplib/).:

```bash
npm install amqplib
```

## Rappel de la terminologie Rabbitmq

* Le **producer** est un émetteur de messages qu'il publie dans un **exchange**
* Une **queue** est une file où sont stockés les messages en attente d'être consommés
* Le passage de l'*exchange* à la *queue* se fait via le **Binding**, en définissant des *routing keys*.
* Le **consumer** est celui qui va lire les messages dans une queue

> Exemple d'article intéressant expliquant les bases du protocol AMQP: https://www.arolla.fr/blog/2012/11/amqp-101-part-1/
