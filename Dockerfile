FROM node:8.16.0-alpine

# Set a working directory
WORKDIR /usr/src/app

COPY ./ .

# Install Node.js dependencies
RUN yarn
RUN yarn build

# Run the container under "node" user by default
USER node

CMD [ "yarn", "start:prod" ]
