import mysql.connector

#needs a function to constantly update currTime, to reference against parkingTimes saved in mysql

# Configure MySQL connection    --***THIS MUST BE UPDATED!!!***
mysql_host = "172.17.0.1"
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

#Add endpoints for requests from React: 
