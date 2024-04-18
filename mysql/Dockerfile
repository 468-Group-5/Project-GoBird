FROM mysql/mysql-server:latest

ENV MYSQL_ROOT_HOST=172.17.0.1
ENV MYSQL_ROOT_PASSWORD=strong_password

COPY ./database.sql /docker-entrypoint-initdb.d/
