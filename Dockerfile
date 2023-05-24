FROM node:20 as base
ENV APP=/home/app
WORKDIR $APP
COPY package*.json $APP/
RUN npm config set depth=0
RUN npm ci --only=production


FROM base as build
COPY tsconfig.json $APP/
RUN npm ci
COPY . $APP
RUN npm run build


# FROM gcr.io/distroless/nodejs:20
FROM node:20-slim
ENV NODE_ENV=production
ENV APP=/home/app
WORKDIR $APP
COPY --chown=node:node --from=base $APP/node_modules $APP/node_modules
COPY --chown=node:node --from=build $APP/config $APP/config
COPY --chown=node:node --from=build $APP/dist $APP/dist
COPY --chown=node:node --from=build $APP/package.json $APP/package.json
USER node

EXPOSE 9002

CMD ["npm", "run", "start"]
