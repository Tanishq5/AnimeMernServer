const jwt = require("jsonwebtoken")
const { json } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const User = require("../model/userSchema");

router.post("/register", async (req, res) => {

    const { userName, email, phone, password, cpassword } = req.body

    if(!userName || !email || !phone || !password || !cpassword) {
        return res.status(406).json({ error: "Please fill the properties"});
    }
    try{
        const userExist = await User.findOne({ email:email})
        if(userExist) {
            return res.status(409).json({erro: "Email already exist"});
        }
        else if(password !== cpassword) {
            console.log(password.length);
            return res.status(401).json({erro: "Password is not matching"});
        }
        else {
            const user = new User({ userName, email, phone, password, cpassword });
            await user.save();
            res.status(201).json({ message: "user registered successfully"});
        }

    }catch(err) {
        console.log(err);
    }
})

router.post("/login", async (req, res) => {
    try {
        let token;
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(406).json({error: "Please fill the data"})
        }

        const userLogin = await User.findOne({email:email});
        const passExist = await User.findOne({password:password})

        // console.log(userLogin)
        

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if(!isMatch) {
                return res.status(401).json({message: "Invalid Credentials"});
            }
            else {
                res.status(201).json({message: "user loggedin successfully"});
            }
        }
        else {
            res.status(400).json({message: "Invalid Credentials"});
        }
    }catch(err) {
        console.log(err);
    }
})

router.get("/about", authenticate, (req, res) => {
    console.log("Hello my about");
    res.send(req.rootUser);
})

router.put("/about/:userId", (req, res) => {
    console.log(req.params.userId);
    User.findOneAndUpdate({_id:req.params.userId}, {
        $set: {
            userName:req.body.userName,
            email:req.body.email,
            phone:req.body.phone,
        }
    })
    .then(result => {
        res.status(200).json({
            updated_profile:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;