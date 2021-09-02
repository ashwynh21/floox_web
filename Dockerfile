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

# we first update npm
RUN npm install -g npm@7.22.0 --quiet
RUN npm install -g next --quiet

# then set the working DIR
WORKDIR /app

# expose the needed port
EXPOSE 8000

# we pull an update if there is
CMD git pull && \
    # almost there, now we install dependencies
    npm install --unsafe-perm --quiet && \
    # build the repo
    npm run build && \
    # then run the start script
    npm run start
