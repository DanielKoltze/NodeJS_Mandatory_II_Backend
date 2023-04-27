import { Router } from "express"
const router = Router()

import passwordUtil from "../util/password.js"

import sendMail from "../util/mailSender.js"
import db from "../database/connection.js"



router.post("/api/signup", async (req, res) => {
  try {
    const existingUser = await db.all(`SELECT * FROM users WHERE email=?`, [
      req.body.email,
    ])
    if (existingUser.length > 0) {
      return res
        .status(400)
        .send({ message: "User with this email already exists" })
    }
    if (
      req.body.email &&
      req.body.password &&
      req.body.password === req.body.repeatedPassword
    ) {
      const hashedPassword = await passwordUtil.hashPassword(req.body.password)
      await db.run(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [req.body.email, hashedPassword]
      );
      
      sendMail(
        req.body.email,
        "You have succesfully been a member of the NodeJS community",
        `You have succesfully been a member of the NodeJS community`
        
      )
      return res.send({
        message: `User with email: ${req.body.email} was succesfully created!`,
      })
    } else {
      return res
        .status(400)
        .send({ message: "The password did not match with repeated password" })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ message: "An error occurred while creating the user" })
  }
})



export default router
