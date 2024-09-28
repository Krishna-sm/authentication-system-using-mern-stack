const jwt = require("jsonwebtoken")
class JWTUtils{
         static generateToken = payload=>{
            const token = jwt.sign(payload,process.env.JWT_KEY,{
                expiresIn:'2d'
            })
            return token
         }
         
}

module.exports = JWTUtils