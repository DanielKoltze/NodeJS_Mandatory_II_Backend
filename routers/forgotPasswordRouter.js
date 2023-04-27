import { Router } from "express"
const router = Router()


import sendMail from "../util/mailSender.js"
import db from "../database/connection.js"

router.post('/api/forgotPassword',async (req,res) => {
    try{
    const existingUser = await db.all(`SELECT * FROM users WHERE email=?`, [
        req.body.email,
      ])
    
    if(existingUser.length === 0){
        console.log("doesnt exist")
        return res.status(404).send({message: `This email: ${req.body.email} does not exist in our database`})
    }else{
        sendMail(req.body.email, "Password", `password for your user is bla bla bla`)
        res.status(200).send({message: "succesfully sent the mail"})
    }
} catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ message: "An error occurred" })
  }
})




export default router