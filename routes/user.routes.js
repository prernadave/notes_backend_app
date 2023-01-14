const express = require('express');
const route = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { userModel } = require('../models/register.login');


route.use(express.json())

route.get("/", (req, res) => {
    res.send("welcome to home page....")
})


route.post("/register", async (req, res) => {
    const { username, email, location, password, date_of_birth, confirm_password, role } = req.body
    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log({ error: "error" });
            } else {
                const user = new userModel({ username, email, location, password: secure_password, date_of_birth, confirm_password: secure_password, role })
                await user.save()
                res.send(user)
                // res.send(user)
                // console.log(user);
            }
        })
    } catch (error) {
        console.log({ error: "Error in registration" })

    }

})


route.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.find({ email });
        const hashed_pass = user[0].password

        if (user.length > 0) {

            bcrypt.hash(password, hashed_pass, (err, result) => {

                if (result) {
                    const token = jwt.sign({ course: "backend" }, "masai");
                    res.send({ "msg": "login successfully", "token": token })
                } else {
                    res.send("wrong credentialss")
                }

            })
        }
    } catch (err) {
        console.log({ err: "error" })
        res.send("wrong info")
    }
});


route.get("/data", async (req, res) => {
    const token = req.headers.authorization
    console.log(token)


    jwt.verify(token, "masai", (err, decoded) => {
        if (err) {
            res.send("invalid token")
            console.log(err)
        } else {
            res.send("data")
        }
    })

    console.log("WELCOME API data ")
})

route.get("/cart", async (req, res) => {
    const token = req.headers.authorization
    console.log(token)


    jwt.verify(token, "masai", (err, decoded) => {
        if (err) {
            res.send("invalid token")
            console.log(err)
        } else {
            res.send("cart page")
        }
    })


    console.log("WELCOME  cart router")
})


route.get("/contact", (req, res) => {
    res.send("WELCOME contact router")
})



module.exports = {
    route
}