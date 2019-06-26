FROM node:12-alpine

# Install Linux dependencies
RUN npm install cross-env rimraf webpack -g

# Create app directory
WORKDIR /usr/src/app

COPY ./ .

ENV NODE_ENV production

RUN yarn install --production
RUN yarn build

USER node

CMD ["yarn", "run", "start:prod"]