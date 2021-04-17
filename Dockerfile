FROM node:alpine
RUN mkdir /app
WORKDIR /app

COPY . ./

RUN npx pnpm i
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
