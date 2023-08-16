FROM node:alpine
WORKDIR /usr/src/api
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]


