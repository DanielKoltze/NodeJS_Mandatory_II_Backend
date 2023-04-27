import { Router } from "express"
const router = Router()




router.get("/home", (req, res, next) => {
    if(!req.session.email){
        res.redirect("/login")
    }else{
        next()
    }
})




export default router