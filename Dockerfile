FROM node:19-alpine3.16

WORKDIR /

COPY . .

RUN npm install -g pnpm && 

RUN pnpm i

EXPOSE 3000

CMD ["pnpm", "dev"]
