# Step 1
FROM node:16-alpine as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm config set registry http://registry.npmjs.org/

RUN npm install
COPY . /app

RUN npm run build

# Stage 2
FROM nginx:stable-alpine

COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]