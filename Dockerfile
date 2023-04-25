FROM node:16.20.0
RUN curl -f https://get.pnpm.io/v6.14.js | node - add --global pnpm
# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./
# RUN pnpm fetch --prod 

ADD . ./
RUN pnpm install

# If you need to compile your source, do it here.
RUN pnpm build
CMD [ "node", "apps/authorization/build/index.js" ]
