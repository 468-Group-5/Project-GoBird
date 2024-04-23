# Python parent image
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose the Flask port + will we need a seperate port for communicating with mySQL? Don't think so, as it maybe can be the same port with different commands being sent?
EXPOSE 8080

# Define the command to run the Flask application
CMD ["python", "go.py"]
