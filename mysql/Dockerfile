FROM mysql/mysql-server:latest
FROM python:latest

WORKDIR /app
COPY myScr.py
COPY cattle_data.csv /docker-entrypoint-initdb.d/cattle_data.csv

CMD ["python", "myScr.py"]
EXPOSE 3306
