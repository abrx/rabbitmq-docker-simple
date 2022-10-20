# Production TodoList

Voici une liste non exhaustive de points à vérifier ou mettre en place avant le passage en production de l'image Rabbitmq :

* Séparer la configuration de l'image docker
* Sécurisation TLS et utilisateurs dédiés pour la publication / consommation
* Utiliser 3 Rabbitmq en quorum pour la haute dispo
* Monitorer l'utilisation des ressources, notamment la mémoire et le disque
* Stocker les images docker dans un dépôt privé comme [Artifactory](https://jfrog.com/artifactory/), [Harbor](https://goharbor.io/) ou [Nexus](https://www.sonatype.com/products/nexus-repository).
* Utiliser un runtime plus sécurisé comme [CRI-O](https://cri-o.io/) ou [Containerd](https://containerd.io/)
* Déployer toute l'infra as Code avec ansible ou équivalent
* Faire un test d'upgrade
* Faire un test de failover
* Faire attention à bien versionner ses images

> Pour rappel, Rabbitmq fourni sa [Production Checklist](https://www.rabbitmq.com/production-checklist.html) 