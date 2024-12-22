FROM node:18
WORKDIR /opt/server
COPY . .
EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=development
# MongoDB ve Redis bağlantısı
ENV MONGO_URI=mongodb://mongo:27017/newmindai-final-case-test-db
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV JWT_SECRET=supersecretkey
ENV KAFKA_BROKER=kafka:9092

RUN yarn install
CMD ["yarn", "run", "dev"]
