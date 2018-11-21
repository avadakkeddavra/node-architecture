FROM node:10.5.0

RUN npm install nodemon -g

WORKDIR /home/project

COPY package*.json ./

RUN npm install

COPY . .
