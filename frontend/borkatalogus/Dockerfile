FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf node_modules && npm install

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]