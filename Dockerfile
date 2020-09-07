# image指定
FROM node:14-alpine

# 作業ディレクトリ作成
RUN mkdir -p /app
COPY . /app
WORKDIR /app

# linux Update, set Timezone, install bash
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    apk add --no-cache bash

RUN yarn install

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "dev"]
