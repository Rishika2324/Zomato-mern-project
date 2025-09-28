const usermodel = require("../models/user.model")

async function registerUser(req, res){

    const { fullName, email, password} = req.body;
    const isUserAlreadyExists = await usermodel.findOne({email})
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
}
}