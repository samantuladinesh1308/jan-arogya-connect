const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    hrn: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    contact : {
        type : Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type : String,
        require : true
    }
})

adminSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email
        }, process.env.JWT_KEY, {
            expiresIn: "7d"
        })

    } catch (error) {
        console.log(error);

    }

}


const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;