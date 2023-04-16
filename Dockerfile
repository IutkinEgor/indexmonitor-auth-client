# base image
FROM node:latest AS node

# set the working directory
WORKDIR /app

# copy the package.json and package-lock.json files
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application
COPY . .

# build the application
RUN ["npm", "run", "build", "--configuration=production"]

# set the base image for the production build
FROM nginx:latest

# copy the build files to the nginx public directory
COPY --from=node /app/dist/im-auth-client /usr/share/nginx/html

# remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# copy Nginx custom configuration
COPY nginx.conf /etc/nginx/conf.d/

# copy Nginx security headers configuration
COPY security-headers.conf /etc/nginx/conf.d/

# expose the port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
