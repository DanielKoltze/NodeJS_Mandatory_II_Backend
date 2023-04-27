import express from "express"

const app = express()



app.use(express.json())
app.use(express.static("../client/dist"))

import path from "path"


import session from "express-session"
import dotenv from "dotenv/config.js"

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

import helmet from "helmet"
app.use(helmet())


import homeRouter from "./routers/homeRouter.js"
app.use(homeRouter)

import loginRouter from "./routers/loginRouter.js"
app.use(loginRouter)

import signupRouter from "./routers/signupRouter.js"
app.use(signupRouter)

import forgotPasswordRouter from "./routers/forgotPasswordRouter.js"
app.use(forgotPasswordRouter)


app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/dist/index.html"))
})

const PORT = Number(process.env.PORT) || 8080

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Server running on port ${PORT}`)
})

