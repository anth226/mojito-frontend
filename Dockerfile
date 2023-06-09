# Pull base image
FROM node:19-alpine3.17

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]