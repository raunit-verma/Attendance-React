FROM node

COPY . /app

WORKDIR /app

RUN chmod +x script.sh

RUN npm install

CMD ./script.sh

EXPOSE 3000