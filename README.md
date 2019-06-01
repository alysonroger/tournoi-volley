# tournoi-volley

## Prerequisites

- docker installed
- docker-compose installed
- A [cloudinary](https://cloudinary.com/) account

## Install on Linux/MacOS

- Create a directory where will be stored the data and cd into it

  ```bash
  mkdir /tmp/docker-tournoi-volley
  cd /tmp/docker-tournoi-volley
  ```

- Create an empty `db` directory

  ```bash
  mkdir db
  ```

- Create a `docker-compose.yaml` file

  ```yaml
  version: '3.7'
  services:
    mongodb:
      image: mongo:latest
      volumes:
        - /tmp/docker-tournoi-volley/db:/data/db
    tournoivolley:
      build: https://github.com/josselinbuils/tournoi-volley.git
      depends_on:
        - mongodb
      environment:
        - HTTP_PREFIX=/
      ports:
        - "3000:3000"
      volumes:
        - /tmp/docker-tournoi-volley/config.json:/tournoi-volley/config.json
        - /tmp/docker-tournoi-volley/db:/data/db
  ```

  You can update the port to access the website by changing the first number in `services->tournoivolley->ports`.

  For example, if you want to use the default http port, replace `3000:3000` by `80:3000`.

- Create a `config.json` file
  ```json
  {
    "cloudinary": "cloudinary://API_KEY:API_SECRET@CLOUD_NAME",
    "cookieSecret": "PUT_ANY_STRING_THERE",
    "mongo": "mongodb://mongodb"
  }
  ```

  Cloudinary information can be found in your [Cloudinary dashboard](https://cloudinary.com/console).

  cookieSecret is a random string that will be used to encrypt data.

  mongo is the internal docker url to the database, you should not have to edit edit.

- Run `docker-compose up -d`

  You have to be in `/tmp/docker-tournoi-volley` when running the docker-compose command.

  You should be able to access the website at [http://localhost:3000](http://localhost:3000).
  If it is not accessible, try running the docker-compose command again.

To access the admin panel, go to [http://localhost:3000/admin](http://localhost:3000/admin).

The default credentials are `admin@keystone.js`/`toto`, don't forget to change the password!
