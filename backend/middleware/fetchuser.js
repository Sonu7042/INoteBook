const jwt = require('jsonwebtoken')
const SecertKey = "sonusingh"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(400).json({ error: "pls enter valid token" })
    }
    try {
        const data = jwt.verify(token, SecertKey)
        req.user = data.user
        next()

    }
    catch{
        res.status(401).json({error:"Failed verify token"})
    }
    
}

module.exports=fetchuser