[![Build Status](https://travis-ci.org/bindoctor/BinDr.svg?branch=master)](https://travis-ci.org/bindoctor/BinDr)



![Image of BinDr](resources/LogoDesigns/pinterest_profile_image.png)
# BinDr
Find your nearest recycling bin
https://bindoctor.herokuapp.com

A mobile first WebApp using Google Maps JS API!

## Setup Instructions
Run `npm install`

Create .env file in your project root with the database configuration:
```
MONGODB_URI=<url>
MONGODB_DEV_URI=<devurl>
MAPBOX_KEY=<mapboxdevkey>
```

NPM scripts available:
```json
"scripts": {
  "test": "jest --coverage --verbose ./tests --detectOpenHandles --runInBand",
  "lint": "eslint .",
  "dev": "NODE_ENV=dev nodemon server.js",
  "start": "node server.js"
}
```
to run the above:

```sh
npm run {script name}
```

To run data population scripts:
```sh
export SCRIPT_DB_URL=<db url>
cd scripts
node insterData.js
```

## CI/CD pipline
Github -> Travis -> Heroku
### Github
Pull requests
### Travis
Runs tests and code coverage
PRs only merge when Travis passes tests and coverage
### Heroku
url: https://bindoctor.herokuapp.com
Pulls from master branch of git and self delpoys. Heroku checks master Travis builds pass.


## Database
You can use any Mongo DB host.
We are using a cloud hosted version.




## Initial Mockup

![Image of Homepage](Mockups/HomePage.png)

