FROM rabbitmq:3.11.2-management

COPY config/10-main.conf /etc/rabbitmq/conf.d/
COPY config/20-tls.conf /etc/rabbitmq/conf.d/
COPY config/30-cluster.conf /etc/rabbitmq/conf.d/
COPY config/40-management.conf /etc/rabbitmq/conf.d/
