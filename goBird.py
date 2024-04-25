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
def get_parking_data():
    # Connect to MySQL database
    db = mysql.connector.connect(
        host=mysql_host,
        user=mysql_user,
        password=mysql_password,
        database=mysql_database
    )

    # Cursor for executing SQL queries
    cursor = db.cursor()

    # Execute SQL query to retrieve data from the parking table
    parkingQuery = "SELECT * FROM parking"
    cursor.execute(parkingQuery)

    # Fetch all rows from the result set
    result = cursor.fetchall()

    # Close the cursor and database connection
    cursor.close()
    db.close()

    return result
    
# Function to retrieve data from the customer table
def get_spots_data():
    # Connect to MySQL database
    db = mysql.connector.connect(
        host=mysql_host,
        user=mysql_user,
        password=mysql_password,
        database=mysql_database
    )

    # Cursor for executing SQL queries
    cursor = db.cursor()

    # Execute SQL query to retrieve data from the parking table
    spotsQuery = "SELECT * FROM spots"
    cursor.execute(spotsQuery)

    # Fetch all rows from the result set
    result = cursor.fetchall()

    # Close the cursor and database connection
    cursor.close()
    db.close()

    return result


#Test parkingData
parkingData = get_parking_data()

#Test spotsData
spotsData = get_spots_data()


# Print the fetched data
for row in parkingData:
    print("Ok so far, parking data print:")
    print(row)
    print("Complete.")


# Print the fetched data
for row in spotsData:
    print("Ok so far, spots data print:")
    print(row)
    print("Complete.")


# Create Flask app
app = Flask(__name__)

# Define a route to return parking data
@app.route('/parking', methods=['GET'])
def parking():
    # Retrieve data from the parking table
    parking_data = get_parking_data()
    return jsonify(parking_data)

# Define a route to return spots data
@app.route('/spots', methods=['GET'])
def spots():
    # Retrieve data from the spots table
    spots_data = get_spots_data()
    return jsonify(spots_data)

# Define a route to return spots data
@app.route('/both', methods=['GET'])
def both():
    # Retrieve data from both the parking & spots table
    parking_data = get_parking_data()
    spots_data = get_spots_data()
    both_data = parking_data + spots_data
    return jsonify(spots_data)


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
