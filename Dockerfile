FROM node

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build --production

RUN npm install -g serve

# CMD [ "npm","run","start" ]

CMD serve -s build

EXPOSE 3000