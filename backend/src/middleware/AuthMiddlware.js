const jwt =require("jsonwebtoken")
exports.verifyUser =(req,res,next)=>{
    try {
                const headerToken = req.headers['authorization'] || ''

                if(!headerToken || !headerToken.startsWith("Bearer ")){
                    return  res.status(400).send({
                        error:"Please Login First",
                        success:false
                    })
                }

                const token = headerToken.split(" ")[1];

                if(!token){
                    return  res.status(400).send({
                        error:"please Provide Valid Token",
                        success:false
                    })
                }

                const verify = jwt.verify(token,process.env.JWT_KEY)

                req.user = verify.userId

                next()




    } catch (error) {
        return  res.status(400).send({
            error:error.message,
            success:false
        })
    }
}