FROM node:alpine as build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Update libxml2 to the fixed version
RUN apk update && apk upgrade && \
    apk add --no-cache libxml2=2.13.4-r6

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]