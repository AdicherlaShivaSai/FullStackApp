const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next)=>{
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json(403).json({error: "User not logged in"});
    }

    try {
        const validToken = verify(accessToken, "your_secret_key");
        if(validToken){
            req.user = validToken;
            return next();
        }
    } catch (err) {
        return res.status(403).json({error: err});
    }
}

module.exports = { validateToken };