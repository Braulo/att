FROM node:16

WORKDIR /app

COPY . . 

RUN npm i

RUN npm i -g @angular/cli

EXPOSE 4200

CMD ["ng", "s", "--host", "0.0.0.0"]