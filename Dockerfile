FROM node:10

# Create app directory
WORKDIR /app

COPY package.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . /app

EXPOSE 10002

CMD [ "node", "app.js" ]
