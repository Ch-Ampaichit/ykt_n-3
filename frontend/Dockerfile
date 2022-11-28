FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_NAME="FN+3"
EXPOSE 3000
CMD ["npm","start"]
