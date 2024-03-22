FROM node:20

WORKDIR /app

ENV NODE_ENV=local

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 4000

# CMD ["npm", "run", "dev"]
