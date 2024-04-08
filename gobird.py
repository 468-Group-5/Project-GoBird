from flask import Flask, request, jsonify
import mysql.connector
import requests

# Initialize Flask app
app = Flask(__name__)

# Configure MySQL connection    --***THIS MUST BE UPDATED!!!***
mysql_host = "mysql"
mysql_user = "your_mysql_user"
mysql_password = "your_mysql_password"
mysql_database = "your_mysql_database"

# Connect to MySQL database
db = mysql.connector.connect(
    host=mysql_host,
    user=mysql_user,
    password=mysql_password,
    database=mysql_database
)

# Cursor for executing SQL queries
cursor = db.cursor()

# Google Maps API key (replace 'your_api_key' with your actual API key)
api_key = 'your_api_key'

# Google Maps API base URL for Geocoding
geocoding_url = f'https://maps.googleapis.com/maps/api/geocode/json?key={api_key}'

# Endpoint for processing data
@app.route('/process', methods=['POST'])
def process_data():
    # Get data from request
    data = request.json
    
    # Example: Convert address to geographic coordinates using Google Maps Geocoding API
    address = data.get('address')
    if address:
        # Send request to Google Maps Geocoding API
        params = {'address': address}
        response = requests.get(geocoding_url, params=params)
        result = response.json()
        
        # Extract latitude and longitude from API response
        if 'results' in result and result['results']:
            location = result['results'][0]['geometry']['location']
            latitude = location['lat']
            longitude = location['lng']
            
            # Example: Insert data into MySQL along with geographic coordinates
            try:
                sql = "INSERT INTO your_table_name (column1, column2, latitude, longitude) VALUES (%s, %s, %s, %s)"
                val = (data['value1'], data['value2'], latitude, longitude)
                cursor.execute(sql, val)
                db.commit()
                return jsonify({'message': 'Data inserted successfully'}), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        else:
            return jsonify({'error': 'Failed to geocode address'}), 500
    else:
        return jsonify({'error': 'Address not provided'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
