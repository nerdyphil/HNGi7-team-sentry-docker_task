FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 10002

CMD [ "node", "app.js" ]
