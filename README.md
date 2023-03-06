## Simple web server ChatGPT + NestJS
####  to use ChatGPT as API

uses https://github.com/transitive-bullshit/chatgpt-api under the hood



## Usage
- rename .env.example to .env
- set OPENAI_API_KEY inside env file
- (optional) SECRET_KEY if you want to add more security to your requests
- install requirements with npm install or yarn install
- start with npm run start:dev or yarn run start:dev


## Methods 
/sendMessage
POST request
- sends message to ChatGPT
- returns response as json 
```
{
    id, // conversation id
    text, // result message
}
```

body parameters:
- text - prompt message
- conversationId - (optional) previous conversation id
- secret - (optional) secret key if process.env.SECRET_KEY is set


### Where to get a remote server?
I recommend ZomRo as one of the cheapest, stable and fast. 
It cost you less than $5 per month. 
My [ref link](https://zomro.com/vds?from=368952).
