
const { Schema, model } = require('mongoose')
const hotelSchema1 = new Schema({
    name:{
        require:true,
        type:String
    },
   
    
})
const hotelSchema2 = new Schema({
    name:{
        require:true,
        type:String
    },

    roomType: Schema.ObjectId,
    
    price:{
        require:true,
        type:Number
    },
    minPrice:{
        require:true,
        type:Number
    },
    maxPrice:{
        require:true,
        type:Number
    }
})


const userSchema = new Schema({
    email:String,
    password:String,
    email:String
})

const roleSchema = new Schema({
    guest:Array,
    admin:Array
})

const Room1 = model( hotelSchema1, 'hotel1')
const Room2 = model(hotelSchema2, 'hotel2')
module.exports = { Room1, Room2  }