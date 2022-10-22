# Utilisation d'un rabbitmq simple avec docker

Le but de ce dépôt est la mise à disposition d'une image docker simple Rabbitmq, avec le plugin de management et des exemples d'utilisation en javascript.
L'image fournie est à des fins de POC/dev uniquement, des informatiosn supplémentaires sont fournies pour un passage en prod.

## Prérequis

### Container runtime - podman

La plupart des exemples et docs utilisent le client `docker`, mais nous lui préfèrerons le client [podman](https://podman.io/), plus moderne et plus sécurisé que docker.
Il est à l'origine développé par Redhat pour être utilisé dans le toolkit développeur pour Openshift, mais peut tout à fait être utilisé indépendamment en remplacement à l'identique de docker pour la majorité des commandes: `podman pull ...`, `podman images`, `podman run ...`, `podman ps -a` ...

Si vous préférrez utiliser docker, toutes les commandes utilisées peuvent simplement être traduites de `podman cmd` vers `docker cmd` avec les mêmes arguments.

### Librairie amqplib pour javascript

On se base ici sur la librairie [amqplib](https://github.com/amqp-node/amqplib) utilisée par le client amqp.node de Nodejs, donc la doc est disponible [ici](https://amqp-node.github.io/amqplib/).:

```bash
npm install amqplib
```

## Utilisation de l'image all-in-one

L'image docker construite à partir du dockerfile de ce dépôt embarque une configuration pré-définie comportant deux publishers, trois queues et les bindings associés :

```mermaid
graph LR
A[publish.js] --> B(broadcast2all)
A[publish.js] --> C(videos)

subgraph rabbitmq
  B -.-> D(youtube)
  B -.-> E(dailymotion)
  B -.-> F(to_review)
  C -->|*.prod.youtube| D(youtube)
  C -->|*.prod.dailymotion| E(dailymotion)
  C -->|videos.dev.*| F(to_review)  
end

D --> G[consume.js]
E --> G[consume.js]
F --> G[consume.js]
```

Elle peut être construite en locale :

```bash
podman build -t rabbitmq-docker-simple:v1.0 .
```

Ou récupérée sur le [dockerhub](https://hub.docker.com/repository/docker/abrxd/rabbitmq-docker-simple/general) :

```bash
podman pull abrxd/rabbitmq-docker-simple:v1.0
```

Pour l'exécuter :

```bash
podman run -d --hostname lapin-1 --name clapier-1 -p 15672:15672 -p 5672:5672 abrxd/rabbitmq-docker-simple:v1.0
```

L'IHM d'administration est joignable à `http://localhost:15672` avec l'utilisateur `guest:guest`

A noter que :

* le nom `clapier-1` correspond au nom du container
* le hostname `lapin-1` correspond au nom du node Rabbitmq
* on expose l'IHM de management sur le port 8080 (le container expose le 15672), on peut s'y connecter sur `http://localhost:8080` avec l'utilisateur `guest:guest`

Le détail pour publier et consommer des messages en javascript est détaillé dans la [section dédiée](docs/javascript-connector.md). 


## Pour aller plus loin

Voici quelques sujets qui sont détaillés séparémment :

* La [sécurisation de l'image](docs/security.md) via un outil de scan d'image
* La [TODOLIST](docs/production-todo.md) avant passage en production
* Comment [mettre à jour](docs/upgrade.md) l'image de test
* Comment [utiliser l'image officielle Rabbitmq](docs/image-officielle.md), utilisée pour construire celle fournie ici

