import mysql.connector
import signal
import sys
from flask import Flask, jsonify, request

# Function to handle SIGTERM and SIGINT signals
def signal_handler(sig, frame):
    print("Received signal {}. Exiting...".format(sig))
    sys.exit(0)

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


# Function to retrieve data from the customer table
def get_customer_data():
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

    # Close the cursor and database connection
    cursor.close()
    db.close()

    return result
    
#Test customerData
customerData = get_customer_data()

# Print the fetched data
for row in customerData:
    print(row)
    print("Ok so far")

# Create Flask app
app = Flask(__name__)

# Define a route to return customer data
@app.route('/customers', methods=['GET'])
def customers():
    # Retrieve data from the customer table
    customer_data = get_customer_data()
    return jsonify(customer_data)

# Define an endpoint to receive data from React
@app.route('/receiveData', methods=['POST'])
def receiveData():
    # Get the data sent from React
    data = request.json
    print("Received data from React:", data)
    # Process the data if needed
    # Return a response if needed
    return jsonify({'message': 'Data received successfully'})

# Register signal handler for SIGTERM and SIGINT
signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGINT, signal_handler)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
