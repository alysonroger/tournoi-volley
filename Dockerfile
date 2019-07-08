FROM node:10
COPY . tournoi-volley
WORKDIR tournoi-volley
RUN yarn install --production --frozen-lockfile
CMD ["yarn", "start", "--https"]
