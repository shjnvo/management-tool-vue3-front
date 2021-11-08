FROM node:12.22-alpine

WORKDIR /repo

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "serve"]