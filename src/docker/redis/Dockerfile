#----------------------------------------------------------------------#
#                             IMAGE
#----------------------------------------------------------------------#

# Or whatever Node version/image you want
FROM node:10.16-alpine

#----------------------------------------------------------------------#
#                             WORKDIR
#----------------------------------------------------------------------#

WORKDIR '/var/www/app/'

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Install deps

#----------------------------------------------------------------------#
#                        COPY: package.json
#----------------------------------------------------------------------#

COPY ./package* ./

#----------------------------------------------------------------------#
#                     RUN: install dependencies
#----------------------------------------------------------------------#

RUN npm config set unsafe-perm true
RUN npm i && npm i -g typescript

COPY . .
