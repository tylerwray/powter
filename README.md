# Powter
__Give power to your Router!__

## Purpose
Powter was created with the purpose of creating more readable code, and easier testing. It provides nice documentation of your API as a side effect.

I wanted to make Powter as lightweight as possible. [Swagger's express middleware](https://www.npmjs.com/package/swagger-express-middleware) solves alot of problems I had with express, but it is quite heavy and has quite a few strange quirks.

## What is it?
Powter is a simple abstraction on top of the express router module that makes your code more testable and straight forward, while also providing some basic documentation.

> The examples below show the simplicity attained with some basic configuration

### With Powter:
```json
{
  "paths": {
    "/user/:id": {
      "controller": "src/routes/user.js",
    }
  }
}

```
```js
export function get(req, res) {
  // Handle Request
}

export function post(req, res) {
  // Handle Request
}
```

### Without Powter:
```js
import { Router } from 'express'

router = new Router()

router.get('/user/:id', (req, res) => {
  // Handle Request
})

router.post('/user/:id', (req, res) => {
  // Handle Request
})
```


## Testing

Testing was a large motivation beind building Powter. Without powter, you cannot truly write unit tests because you are also testing express. Not to mention that if you are using a library like supertest, you are most likely testing your server startup file as well.

> The below examples show you the difference of using powter vs normal express definitions.

### With Powter:
```js
import User from 'src/routes/user.js'

describe('User Route /user/:id', () => {
  let req = { params: { id: 1234 } }
  let res = {
    send: (body) => this.body = body
  }

  describe('GET', () => {
    it('should respond with the user object', () => {
      User.get(req, res)

      expect(res.body).to.equal({ user: 'Tyler', new: false })
    })
  })

  describe('POST', () => {
    it('should respond with a new user object', () => {
      User.post(req, res)

      expect(res.body).to.equal({ user: 'Ashley', new: true })
    })
  })
})
```
> Notice the only testing dependency is the user.js file. Also notice the lightweight stubs for the req and res objects

### Without Powter:
```js
import User from 'src/routes/user.js'
import Server from 'src/index.js'

import Request from 'supertest'

describe('User Route /user/:id', () => {
  describe('GET', () => {
    it('should respond with the user object', async () => {
      let response = await Request(Server)
        .set('Authorization', 'Bearer token')
        .get('/user/:id')

      expect(response.body).to.equal({ user: 'Tyler', new: false })
    })
  })

  describe('POST', () => {
    it('should respond with a new user object', async () => {
      let response = await Request(Server)
        .set('Authorization', 'Bearer token')
        .post('/user/:id')

      expect(response.body).to.equal({ user: 'Ashley', new: true })
    })
  })
})
```

> Notice the extra dependancies, the authorization, and the fact that we have to import an entire HTTP Server!

## Getting Started

A powter configuration file can be as simple or as verbose as needed.

By default, all functions can be named after the intended HTTP method, but names can be specified as needed.

### Here is a basic example:

server.js
> Pass the express app and config file path into powter so it can build the routes
```js
const express = require('express')
const powter = require('powter')
const app = new express()

// Build the routes
powter(app, 'config/routes.json')
```

routes.json
> Configure you're API
```json
{
  "paths": {
    "/user/:id": {
      "controller": "src/routes/user.js",
    },
    "/order/:id": {
      "controller": "src/routes/order.js",
      "delete": "removeOrder"
    }
  }
}
```

user.js
```js
export function get(req, res) {
  // Handle Request
}

export function post(req, res) {
  // Handle Request
}

export function put(req, res) {
  // Handle Request
}

export function patch(req, res) {
  // Handle Request
}

export function unlink(req, res) {
  // Handle Request
}
```

order.js
```js
export function get(req, res) {
  // Handle Request
}

export function post(req, res) {
  // Handle Request
}

export function removeOrder(req, res) {
  // Handle Request
}
```
