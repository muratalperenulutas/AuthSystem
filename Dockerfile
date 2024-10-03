FROM node:20.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install dotenv bcrypt crypto jsonwebtoken pg nodemailer express path

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

