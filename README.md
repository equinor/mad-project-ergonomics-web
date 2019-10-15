# Equinor Ergonomics | Admin Web Interface

This is a web-admin-interface for the internal app `Equinor Ergonomics`.

## Build status
Todo: Change url for the build-status-indicators (currently pointing to PleaseMove)
|Branch | Build Status|
| ---- | ---- | 
|Master|[![Build Status](https://statoil-mad.visualstudio.com/PleaseMove/_apis/build/status/PleaseMove%20-%20iOS%20-%20Build?branchName=master)](https://statoil-mad.visualstudio.com/PleaseMove/_build/latest?definitionId=192&branchName=master)|
|Develop|[![Build Status](https://statoil-mad.visualstudio.com/PleaseMove/_apis/build/status/PleaseMove%20-%20iOS%20-%20Build?branchName=develop)](https://statoil-mad.visualstudio.com/PleaseMove/_build/latest?definitionId=192&branchName=develop)|


## Developer help
### How to get it up and running
```bash
git clone https://github.com/equinor/mad-project-ergonomics-web
cd mad-project-ergonomics-web
npm i
npm start
```
### Run it in a docker container
*Requirements:* [Docker](https://docs.docker.com) installed on your machine.
 
```bash
docker build -t ergonomics . && docker run -p 5001:5001 ergonomics 
```

### Run tests with jest
```
npm test
```

## More info
This project was initially forked from [mad-webapp-template](https://github.com/equinor/mad-webapp-template). Check it out if you have any questions to the base-setup.
