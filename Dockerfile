FROM node

COPY . /app

WORKDIR /app

RUN chmod +x script.sh

CMD ./script.sh

EXPOSE 3000