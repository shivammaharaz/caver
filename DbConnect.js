const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')

const URL = "mongodb+srv://Shivam:2001@cluster0.bxo7vjp.mongodb.net/CAVER"

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


