# Simple NestJs ChatGPT Server 
####  to use ChatGPT as API

used @transitive-bullshit/chatgpt-api under the hood

## Usage
- rename .env.example to .env
- set login and password inside env file
- install requirements with npm install or yarn install
- start with npm run start:dev or yarn run start:dev


## Methods
``` 
/sendMessage
GET request
- sends message to ChatGPT and returns response

query parameters:
- text - prompt message
- conversationId - (optional) previous conversation id
- messageId - (optional) previous message id

returns
result of the request
```

## example request
```
/sendMessage?text=Hello!
```
