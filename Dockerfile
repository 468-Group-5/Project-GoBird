# 1. Base Image
FROM node:alpine

# 2. Set Working Directory and Copy all files / folders
WORKDIR /app
COPY . /

# 3. Install Dependencies
RUN npm install
RUN npm update

# 4. Expose Port (usually 3000 for React apps)
EXPOSE 3000

# 5. Start Command
CMD ["sh", "-c", "trap 'echo SIGTERM received' SIGTERM; npm start"]
