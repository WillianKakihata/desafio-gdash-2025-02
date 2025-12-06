FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development
EXPOSE 8080

CMD ["npm", "run", "start:dev"]
