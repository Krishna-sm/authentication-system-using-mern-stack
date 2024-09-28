const mongoose =  require("mongoose")
const bcrypt = require("bcryptjs")
const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lower:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

Schema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        this.password  = await bcrypt.hash(user.password,12);
    }

    next()
})


const model = mongoose.model("user",Schema);

module.exports = {
    UserModel:model
}