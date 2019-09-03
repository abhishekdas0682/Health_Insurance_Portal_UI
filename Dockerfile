FROM node:12.2.0-alpine as build
COPY . /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm install axios

RUN npm run build


FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3006
CMD ["nginx", "-g", "daemon off;"]