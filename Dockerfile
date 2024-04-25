# 1. Base Image
FROM node:alpine AS builder

# 2. Working Directory (for builder stage)
WORKDIR /app

# 3. Copy Package.json and package-lock.json (or yarn.lock)
COPY . .

# 4. Install Dependencies
RUN npm install

# 5. Copy Your React App Code
COPY /src/ /App.js 

# 6. Build Stage (optional, comment out if not needed)
FROM node:alpine

# 7. Working Directory (for final stage)
WORKDIR /app

# 8. Copy Production Build of React App (replace 'build' with your output directory)
COPY /src App.js

# 9. Expose Port (usually 3000 for React apps)
EXPOSE 3000

# 10. Start Command
CMD [ "npm", "start" ]
