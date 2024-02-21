const express = require('express')
const User = require('../model/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fetchuser = require('../middleware/fetchuser')

const SecertKey = "sonusingh"


//this route for SingUp
router.post('/signup', [
    body("name", "enter atleast 3 characters").isLength({ min: 3 }),
    body("email", "enter atleast 3 characters").isEmail(),
    body("password", "enter atleast 3 characters").isLength({ min: 4 }),
], async (req, res) => {
    let success = false
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() })
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json("Sorry this user already exist")
        }
        const salt = await bcrypt.genSalt()
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,

        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true

        const authtoken = jwt.sign(data, SecertKey)
        res.status(200).json({ success, authtoken })

    }
    catch {
        res.status(500).json("Server Internal Problem")

    }

})



//this router for Login

router.post('/login', [
    body("email", "enter valid email").isEmail(),
    body("password", "password cannot be blank").exists()

], async (req, res) => {
    try {
        let success = false
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
        }

        const { email, password } = req.body
        let user = await User.findOne({ email })

        if (!user) {
            success = false
            res.status(400).json({ error: "pls try to login with correct email" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            res.status(400).json({ error: "pls try ot login with correct password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true

        const authtoken = jwt.sign(data, SecertKey)

        res.status(200).json({ success, authtoken })
    }

    catch {
        res.status(500).json("Server Internal Problem")
    }
})




//this route for fetch logged and signup user
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        console.log(userId)
        const user = await User.findById(userId)
        res.send(user)
    }
    catch {
        res.status(500).json("Internal Server Problem")

    }
})

module.exports = router

