# Production TodoList

Voici une liste non exhaustive de points à vérifier ou mettre en place avant le passage en production de l'image Rabbitmq :

* Stocker les images docker dans un dépôt privé comme [Artifactory](https://jfrog.com/artifactory/), [Harbor](https://goharbor.io/) ou [Nexus](https://www.sonatype.com/products/nexus-repository).
* Utiliser un runtime plus sécurisé comme [CRI-O](https://cri-o.io/) ou [Containerd](https://containerd.io/)
* Déployer toute l'infra as Code avec ansible ou équivalent
* Faire un test d'upgrade
* Faire un test de PRA
* Vérifier la [Production Checklist](https://www.rabbitmq.com/production-checklist.html) de Rabbitmq, notamment: 
  * Utiliser des utilisateurs dédiés pour chaque besoin
  * Monitorer l'utilisation des ressources, notamment la mémoire et le disque
  * Utiliser de préférence un cluster en quorum
* Faire attention à bien versionner ses images
