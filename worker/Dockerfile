FROM node:20-bullseye

WORKDIR /app

COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y ffmpeg

RUN npm install

COPY . .

EXPOSE 5001

RUN npm run db:generate
RUN npm run build

CMD ["npm", "run", "start"]
