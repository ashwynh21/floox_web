# syntax=docker/dockerfile:1

FROM node:14-alpine
# we first then update the OS
RUN apk update
# then install GIT
RUN apk add git

# then we configure the token into GIT
RUN git config --global url."https://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:@github.com/".insteadOf "https://github.com/"
# then clone in the repo
RUN git clone https://github.com/ashwynh21/floox_web.git app

# then set the working DIR
WORKDIR /app

# we first update npm
RUN npm install -g npm@7.21.1 --quiet

# expose the needed port
EXPOSE 8000

# almost there, now we install dependencies
CMD ['npm', 'install --unsafe-perm']
# build the repo
CMD ['npm', 'run build']

# then run the start script
CMD ['npm', 'run start']
