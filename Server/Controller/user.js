const User = require('../Models/user');

exports.Sighnup = (req, res) => {
    const { email, password, name } = req.body;

    const userObj = new User ({
        email,
        password,
        name
    });

    userObj.save()
        .then(response => {
            res.status(200).json({
                message:"User Details Saved Successfully", 
                signUp: response 
            })        
        })
        .catch(err =>{
            res.status(500).json({ error: err })
        })
    
}

exports.userLogin = (req, res) => {
    const { email, password } = req.body;

    User.find({
        email,
        password
    })

    .then(response => {
        if(response.length > 0){
            res.status(200).json({
                message: "User Validated",
                isAuthenticated: true,
                user: response
            })
        }else{
            res.status(200).json({
                message: "User Not Validated",
                isAuthenticated: false,
                user: response
            })
        }
        
    })
    .catch(err => {
        res.status(500).json ({
            error: err
        })
    })
}