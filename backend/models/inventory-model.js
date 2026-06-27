const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    employee_id: {
        type: String,
        require: true
    },
    password: {
        type : String,
        require : true
    }
})

inventorySchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            employee_id : this.employee_id
        }, process.env.JWT_KEY, {
            expiresIn: "7d"
        })

    } catch (error) {
        console.log(error);

    }

}


const inventory = new mongoose.model("inventory", inventorySchema);

module.exports = inventory;