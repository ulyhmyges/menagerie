FROM node:18-alpine as build-project-typescript
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json /app
#COPY .env.local /app
COPY --from=build-project-typescript /app/dist /app/dist
RUN npm install --omit=dev
CMD npm start