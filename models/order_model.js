const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    userId:{type:String, required:true },
    products:[
        {
            productId:{type: String},
            quantity:{type: Number, deafult:1}
        }
    ],
    amount: {type: Number, required:true},
    address:{type: Object, required: true},
    status:{type: String, deafult: "pending"}

},{ timestamps:true });

module.exports = mongoose.model(`Order`, orderSchema);