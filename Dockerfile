FROM node:8.10.0-alpine

# Set a working directory
WORKDIR /usr/src/app

COPY ./ .

# Install Node.js dependencies
RUN yarn install --no-progress
RUN yarn build --release

# Run the container under "node" user by default
USER node

CMD [ "node", "./build/server.js" ]
