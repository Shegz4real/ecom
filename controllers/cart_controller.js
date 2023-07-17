const cart = require('../models/cart_model');

//@desc ..... create new cart
//@route ..... /cart

exports.createCart = async (req, res)=>{

    const cart = new Cart(req.body);

    try{

        await cart.save();
        res.status(200).json(cart);

    } catch(err){
        res.status(500).json(err);
    }
}

//@desc .....  update cart;
//@route ..... /cart/update

exports.updateCart = async(req, res)=>{
    try{
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },  
            {new : true }
        );
        res.status(200).json(cart);

    }catch(err){
        res.status(500).json(err)
    }
}

//@desc ..... delete your cart
//@route ..... /cart/id

exports.deleteCart = async (req, res)=>{

    try{

        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('cart has been deleted');

    }catch(err){
        res.status(500).json(err)
    }
}

//@desc ..... get user cart
//@route .... /cart

exports.getCart = async (req, res)=>{

    try{
        const cart = await cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }
}


//@desc .... get all cart details, accesible byv only admins.
//@route ..... /cart/all

exports.getAllcarts = async (req, res)=>{
    try{
        const carts = await cart.find();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
}
 