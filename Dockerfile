# Use an Official Node runtime as parent image
FROM node:8.11.3

# Set the work directory
WORKDIR /SpecificallySports

# add `/SpecificallySports/node_modules/.bin` to $PATH
ENV PATH /SpecificallySports/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /SpecificallySports/package.json
RUN npm install -s
RUN npm install -g @angular/cli@6.0.7

# Copy app over to working directory
COPY . /SpecificallySports

# start app
CMD ng serve --host 0.0.0.0
