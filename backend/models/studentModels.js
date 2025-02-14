mongoose =require("mongoose");


stuSchema = new mongoose.Schema({
        name:String,
        rollno:Number,
        city:String,
        fees:Number,
        image:String
})

module.exports = mongoose.model("student", stuSchema)