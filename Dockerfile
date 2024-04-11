FROM node:latest

RUN npm install react

COPY /src/ /app.js /
CMD ["node", "/app.js"]
EXPOSE 3000
