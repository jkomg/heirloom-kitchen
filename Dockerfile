# Dockerfile — single container for Cloud Run (serves site + API).
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
# Cloud Run sets PORT (8080). Container must listen on it.
EXPOSE 8080
CMD ["node", "server.js"]
