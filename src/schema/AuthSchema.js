const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');


const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must contain atleast 3 characters"]
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(value){
            if (!validator.isEmail(value)){
                throw new Error ("Invalid Email!");
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password must contain atleast 6 characters"]
    },

    confirmpassword: {
        type: String,
        required: true,
        minlength: [6, "Password must contain atleast 6 characters"],
    }
});


authSchema.pre("save", async function(next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = undefined;
    }
    
    next();

})

const Authorization = new mongoose.model("Authorization", authSchema);

module.exports = Authorization;