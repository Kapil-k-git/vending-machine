# backend/Dockerfile

FROM node:24.2

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy Prisma schema and other source files
COPY . .

# Run prisma generate to generate the client
RUN npx prisma generate

# Build TypeScript if applicable
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
