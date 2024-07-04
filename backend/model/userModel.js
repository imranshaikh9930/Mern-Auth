const mongoose = require("mongoose");

const userSchema= mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minLength: 3,
        maxLength: 50,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    userProfile:{
        type:String,
        default:"https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-career-set-c_1013341-79442.jpg?w=740"
    }

},{timestamps:true})

module.exports = mongoose.model("User",userSchema);