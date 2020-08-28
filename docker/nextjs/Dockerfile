# image指定
FROM node:14-alpine

# linux Update, set Timezone, install bash
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    apk add --no-cache bash

# 作業ディレクトリ作成
WORKDIR /app

ENV HOST 0.0.0.0
EXPOSE 8080
