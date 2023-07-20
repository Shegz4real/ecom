const Product = require('../models/product_model');

var user_id;

//@desc ..... create new procucts
//@routes ...... /products/create

exports.createProduct = async (req, res)=>{

    const product = new Product(req.body);
    try{

        const savedProduct  = await product.save();
        res.status(200).json(savedProduct);

    }catch(err){
        res.status(500).json(err)
    }
}


//@desc ..... get full list of products
//@route ..... /products

exports.getProducts = async (req, res)=>{

    const qNew = req.query.new;
    const qCategory = req.query.category;
    

    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
            console.log(products);
        } else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory]
                },
            });

        }else{
            products = await Product.find();
           
        }

        res.status(200).json(products);

    }catch(err){
        res.status(500).json(err);
    }

}

//@desc .... update product info
//@route .... product/:id

exports.editProduct = async (req, res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, {
            $set:req.body
        },{ new : true }
        );
        res.status(200).json(updatedProduct);

    }catch(err){
        res.status(500).json(err)
    }   
}

//@desc ..... delete product
//@route ..... /products/:id

exports.deleteProduct = async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('product has been deleted')
    } catch(err){
        res.status(500).json(err);
    }
}

//@desc .... get a product
//@route ..... /product/:id

exports.selectProduct = async (req, res)=>{
    
    try{

        const product = await Product.findById(req.params.id);
        res.status(200).json(product);

    }catch(err){
        res.status(500).json(err)
    }
}