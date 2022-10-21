const express = require('express')
const app = express()
const cors = require("cors")
const caverModel = require('./DbConnect')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, resp) => {
    resp.send("hello")
})
app.post('/signup', (req, resp) => {
    const { fname, lname, email, phno, password } = req.body
    const user = {
        fname: fname,
        lname: lname,
        email: email,
        phno: phno,
        password: password
    }
    caverModel.findOne({ email: user.email }, (err, docs) => {
        if (!err) {
            if (docs) {
                resp.json({ message: "user already registered" })
            }
            else {
                const result = new caverModel(user)
                result.save(err => {
                    if (!err) {
                        console.log('data saved in db')
                        resp.json({ message: "signup successful" })
                    }
                })
            }
        }
    })

})

app.post("/signin", (req, resp) => {
    const { email, password } = req.body
    const user = {
        email: email,
        password: password
    }
    caverModel.findOne({ email: user.email }, (err, docs) => {
        if (!err) {
            if (docs) {
                if (docs.password === user.password) {
                    resp.json({
                        message: "login successful"
                        , user: { _id: docs._id, email: docs.email, fname: docs.fname, lname: docs.lname, phno: docs.phno, }
                    })
                }
                else {
                    resp.json({ message: "incorrect-password" })
                }
            }
            else {
                resp.json({ message: "user not registered" })
            }
        }
    })
})

app.listen(PORT, () => {
    console.log("live now")
})

