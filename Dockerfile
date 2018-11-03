FROM node:8
COPY . tournoi-volley
WORKDIR tournoi-volley
RUN npm install --production
CMD ["npm", "start"]
