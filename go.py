from flask import Flask, request, jsonify
import mysql.connector
import requests

#needs a function to constantly update currTime, to reference against parkingTimes saved in mysql

# Initialize Flask app
app = Flask(__name__)

# Configure MySQL connection    --***THIS MUST BE UPDATED!!!***
mysql_host = "localhost"
mysql_user = "root"
mysql_password = "strong_password"

# Connect to MySQL database
db = mysql.connector.connect(
    host=mysql_host,
    user=mysql_user,
    password=mysql_password,
)

# Cursor for executing SQL queries
cursor = db.cursor()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)        #default IP matches any address, exposed port

#Add endpoints for requests from React: 
