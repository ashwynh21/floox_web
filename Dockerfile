# syntax=docker/dockerfile:1

FROM node:14-alpine

# we first then update the OS
RUN apk update
# then install GIT
RUN apk add dumb-init
RUN apk add git

# then we configure the token into GIT
RUN git config --global url."https://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:@github.com/".insteadOf "https://github.com/"
# then clone in the repo
RUN git clone https://github.com/ashwynh21/floox_web.git app

# we first update npm
RUN npm install -g npm@7.22.0 --quiet
RUN npm install -g next --quiet

# then set the working DIR
WORKDIR /app

# almost there, now we install dependencies
RUN npm install --unsafe-perm

# expose the needed port
EXPOSE 8000

ENV production "true"

RUN npm run build

# then run the start script
CMD ["dumb-init", "next", "start --port 8000"]
