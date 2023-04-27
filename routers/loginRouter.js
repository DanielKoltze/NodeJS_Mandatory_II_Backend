import { Router } from "express"
const router = Router()

import bcrypt from "../util/password.js"
import db from "../database/connection.js"
import rateLimit from 'express-rate-limit'


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: {
      message: "Too many requests from this IP, please try again later.",
      code: 429
    },
    headers: true
  })
  
  router.post("/api/login", limiter, async (req, res) => {
    const password = req.body.password
    const email = req.body.email

    try {
      const existingUser = await db.all(`SELECT * FROM users WHERE email=?`, [
        email,
      ])
      if (existingUser.length > 0) {
        const isSamePassword = await bcrypt.comparePassword(password, existingUser[0].password)
        if (isSamePassword) {
          console.log("logged in")
          req.session.email = email
          return res.status(200).send({ message: "You have successfully been logged in" })
        }
      }
    
    res.status(401).send({ message: "Wrong password or username" })



    }catch (error) {
      console.log(error)
      return res
        .status(500)
        .send({ message: "An error occurred when trying to login" })
    }
    
    
  })
  

export default router