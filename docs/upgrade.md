# Upgrade de Rabbitmq

On peut voir les nouvelles versions disponibles dans la [liste des tags sur dockerhub](https://hub.docker.com/_/rabbitmq/tags).

Pour utiliser un Rabbitmq plus récent, il faut:

* Vérifier que les [releases notes](https://www.rabbitmq.com/changelog.html) ne comportent pas de breaking change
* Modifier le tag utilisé dans son dockerfile : `FROM rabbitmq:<new_tag>-management`
* Déployer et tester !

Bien sûr la procédure d'upgrade d'un cluster en quorum en garantissant la HA sera un peu plus complexe et nécessitera un peu d'automatisation.
