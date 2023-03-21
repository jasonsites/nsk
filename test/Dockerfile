FROM node:18 as build
ENV APP=/home/app
WORKDIR $APP
COPY package*.json tsconfig.json $APP/
RUN npm config set depth=0
RUN npm ci
COPY . $APP
RUN npm run build
RUN npm run lint


# FROM gcr.io/distroless/nodejs:18
FROM node:18-slim
ENV NODE_ENV=development
ENV APP=/home/app
WORKDIR $APP
COPY --chown=node:node --from=build $APP $APP
USER node

EXPOSE 9004

CMD ["npm", "run", "dev"]
