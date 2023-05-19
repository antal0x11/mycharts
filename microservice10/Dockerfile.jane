FROM node:latest
RUN mkdir /src
WORKDIR /src
RUN mkdir storage
COPY package*.json .
RUN npm install
COPY . /src
EXPOSE 3000
CMD ["npm", "start"]