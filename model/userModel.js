const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,

    },
    isAdmin: {
        type: Boolean,
        required:true
    }
})


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.post('save', function (doc) {
    console.log("After storing it in database:" + doc);
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;