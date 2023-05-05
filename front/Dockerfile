FROM node:lts-alpine3.17 AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

ENV CI=true
ENV PORT=3000
EXPOSE 3000:3000

CMD [ "npm", "start" ]