FROM node:20-alpine AS build-env
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build-env /app/dist ./dist
EXPOSE 5173
CMD ["npx", "vite", "preview", "--port", "5173", "--host"]
