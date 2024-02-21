FROM node

COPY . /app

WORKDIR /app

RUN npm install

CMD [ "npm","run","start" ]

EXPOSE 3000