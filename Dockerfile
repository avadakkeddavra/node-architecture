FROM node:10.5.0

RUN npm install pm2 -g
RUN npm install nodemon -g

WORKDIR /home/project



COPY ./web/package*.json ./
RUN npm install

COPY ./web ./