FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 3000