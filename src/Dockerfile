FROM node:latest

RUN npm install express
RUN npm install reactJS

COPY files/ /files/
COPY webui.js /
CMD ["node", "/app.js"]
EXPOSE 3000
