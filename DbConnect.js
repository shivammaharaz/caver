const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')

const URL = "mongodb+srv://rohanranaa:2001@cluster®.us7lmcm.mongodb.net/CAVER"

mongoose.connect(URL, {
    useNewUrlParser: true
},
    (err) => {
        if (!err) {
            console.log("Db Connected Successfully")
        }
    }
)

const caverUserSchema = Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String, require, unique: true },
    phno: { type: String },
    password: { type: String }
})

const caverModel = model("caverUsers", caverUserSchema)

module.exports = caverModel;


