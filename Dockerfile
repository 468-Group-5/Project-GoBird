FROM node:latest

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent


COPY /src/ /api.js /
CMD ["npm", "run", "dev"]
EXPOSE 3000
