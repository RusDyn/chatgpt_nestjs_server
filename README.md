# Simple NestJs ChatGPT Server 
####  to use ChatGPT as API

uses https://github.com/transitive-bullshit/chatgpt-api under the hood

## Problem
No public API exists right now for ChatGPT.
Existing api wrapper requires to setup server in headfull mode

Solution
- buy simple cheap private windows server with RDP. 
- start your own server on it
- use as remote api

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

### Where to get a remote server?
I recommend ZomRo as one of the cheapest, stable and fast. 
It cost you less than $5 per month. 
My [ref link](https://zomro.com/vds?from=368952).
