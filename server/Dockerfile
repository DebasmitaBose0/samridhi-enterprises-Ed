FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production --no-audit --no-fund

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
