FROM node:22.14.0-alpine

WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT=3000
EXPOSE $PORT

CMD ["npm", "start"]
