FROM node:18.15.0

WORKDIR /planning_poker_api

COPY . /planning_poker_api

RUN npm install --force

EXPOSE 5050

CMD node app.js