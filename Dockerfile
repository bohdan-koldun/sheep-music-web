# Stage 1
FROM node:13 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

CMD ["yarn", "run", "start:prod"]