const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTKEY)
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
        if(!user)
            throw new Error('User not found')
        req.user = user
        req.token = token
        next()
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            date: e.message,
            message: "unauthorized"

        })
    }
    
    //next()
}

module.exports = auth