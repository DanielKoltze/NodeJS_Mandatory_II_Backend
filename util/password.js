import bcrypt, { hash } from "bcrypt"

async function hashPassword(password){
    try{
        return await bcrypt.hash(password,12)
    }
    catch(error){
        console.log('An error occurred while hashing the password:', error);
    }
}

async function comparePassword(userPassword, hashedPassword){
    return await bcrypt.compare(userPassword,hashedPassword)
}



import crypto from "crypto"

function generateRandomPassword(){
    const bytes = crypto.randomBytes(length);
    return bytes.toString('hex');
}


export default{
    comparePassword,
    hashPassword, 
    generateRandomPassword
}