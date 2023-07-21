const Order = require('../models/order_model');

//@desc ..... create and order
//@route ..... /order

exports.createOrder = async (req, res)=>{
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(200).json(order);

    }catch(err){
        res.status(500).json(err);
    }
    
}

//@desc..... update order. admin only
//@route ..... /order

exports.updateOrder = async (req, res) =>{
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, 
            {
                $set:req.body
            },
            { new:true }
        );

    }catch(err){
        res.status(500).json(err);
    }
}

//@desc ..... delete order. admin only
//@route ..... /order.

exports.deleteOrder = async (req, res)=>{

    try{
        await Order.findByIdAndDelete(req.params.id);    
    }catch(err){
        res.status(500).json(err)
    }
}