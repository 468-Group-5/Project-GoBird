import mysql.connector

# Configure MySQL connection
mysql_host = "mysql"  # Use the service name for MySQL within Kubernetes
mysql_user = "root"
mysql_password = "password"  # Replace with your actual MySQL password
mysql_database = "gobird"  # Specify your MySQL database name

# Connect to MySQL database
db = mysql.connector.connect(
    host=mysql_host,
    user=mysql_user,
    password=mysql_password,
    database=mysql_database
)

# Cursor for executing SQL queries
cursor = db.cursor()

# Execute SQL query to retrieve data from the customer table
query = "SELECT * FROM customer"
cursor.execute(query)

# Fetch all rows from the result set
result = cursor.fetchall()

# Print the fetched data
for row in result:
    print(row)

# Close the cursor and database connection
cursor.close()
db.close()
