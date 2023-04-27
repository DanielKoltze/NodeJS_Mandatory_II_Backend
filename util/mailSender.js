import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const nodemailerTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "hansenjenserik9@outlook.com",
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3'
    }
})




function sendMail(toMail, subject, text){
    const mail = {
        from: "hansenjenserik9@outlook.com",
        to: toMail,
        subject: subject,
        text: text
    }

    nodemailerTransporter.sendMail(mail, (error) => {
        if(error){
            console.log("Nodemailer has an error: " + error)
            return
        }else{
            console.log("Mail was succesfully sent")
            return 
        }
    })

}

export default sendMail