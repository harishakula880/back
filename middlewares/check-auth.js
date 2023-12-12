const jwt=require("jsonwebtoken");

module.exports=(res,req,next)=>{
    try{
        const token=req.headers.authorization.split("")[1];
        if(!token){
            return res.status(401).json({
                message: "Token not Found! unauthorized!!",
            })
        }
        const decodeToken=jwt.verify(token,"mysecret");
        req.incubatorNumber=decodeToken.incubatorNumber;
        next();
    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error!",
        })
    }
}