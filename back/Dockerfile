# syntax=docker/dockerfile:1.4
FROM node:lts as developpement

WORKDIR /code

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s \
    CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY . /code

CMD [ "npm", "start" ]