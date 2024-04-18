FROM node:latest

ENV PATH /node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent


COPY /src/ /api.js /
CMD ["npm", "run", "dev"]
EXPOSE 3000
