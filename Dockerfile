# Base image for all services (choose a minimal image based on your needs)
FROM ubuntu:20.04

# Create separate working directories for each service
RUN mkdir -p /app/web /app/db /app/backend

# WebUI (React)
WORKDIR /app/web ## 
COPY . .  # Replace with path to your React application code
RUN npm install  # Install dependencies (if using npm)
EXPOSE 80  # Expose React app port (modify if needed)
CMD [ "npm", "start" ]  # Start command for React app (modify if needed)

# Database (MySQL)
WORKDIR /app/db 
COPY lxphung/mysql:latest .  # Replace with your MySQL image
EXPOSE 3306  # Standard MySQL port
CMD [ "docker-entrypoint.sh", "mysqld" ]  # Default MySQL entrypoint

# Backend (Python)
WORKDIR /app/backend
COPY bxdda/go_bird:latest .  # Replace with your Python backend image
EXPOSE 8080  # Backend worker port, we have many options for what node we want to expose for the worker, may need to be modified later
CMD [ "python", "gobird.py" ]  # Replace with your Python script

# Final note:
# This is a basic example. You might need additional configurations 
# based on your specific requirements (e.g., environment variables, volumes).
