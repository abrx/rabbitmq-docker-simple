# Utilisation de l'image officielle Rabbitmq

L'image de base utilisée est l'[image Rabbitmq officielle](https://hub.docker.com/_/rabbitmq) présente sur le docker hub.

* On utilise la version de base et non la version alpine, comme préconisé pour la PROD
* On utilise les tags `*-management` qui incluent le plugin management activé par défaut
* On ne sélectionne que les tags présentant a minima la version mineure utilisée: `3.11.2-management` (il manque la version OS pour être parfait)

Pour instancier simplement l'image officielle :

```bash
podman pull rabbitmq:3.11.2-management
podman run -d --hostname lapin-1 --name clapier-1 -p 8080:15672 rabbitmq:3.11.2-management
```

A noter que :

* le nom `clapier-1` correspond au nom du container
* le hostname `lapin-1` correspond au nom du node Rabbitmq
* on expose l'IHM de management sur le port 8080 (le container expose le 15672), on peut s'y connecter sur `http://localhost:8080` avec l'utilisateur `guest:guest`

Le détail pour publier et consommer des messages en javascript est détaillé dans la [section dédiée](docs/javascript-connector.md). 