import Product from "../models/product.js";
import { v4 as uuid } from 'uuid'


async function index(req, res){

    try{
        const products = await Product.find()
        return res.status(200).json({ products })
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function store(req, res){
    
    const { productName, productImage, productPrice, productLDescription, productSDescription, productPostDate, productExpiresAt, } = req.body;

    if(!productName){
        return res.status(400).json({error: 'Must inform a product name'})
    }

    const product = new Product ({
        _id: uuid(),
        productName,
        productImage,
        productPrice,
        productLDescription,
        productSDescription,
        productPostDate,
        productExpiresAt,
    })
    try{
        await product.save();
        return res.status(201).json({ messagem: `Product ${productName} added succesfully`})
    }catch(err){
        res.status(500).json({ error: err.message })
    }

}

async function update(req, res){
    const { productName, productImage, productPrice, productLDescription, productSDescription, productPostDate, productExpiresAt } = req.body

    if( !productName && !productPrice ) {
        return res.status(400).json({ error: "You must inform a product name and/or product price before submit!"})
    }
    
    if(productName) res.product.productName = productName
    if(productImage) res.product.productImage = productImage
    if(productPrice) res.product.productPrice = productPrice
    if(productLDescription) res.product.productLDescription = productLDescription
    if(productSDescription) res.product.productSDescription = productSDescription
    if(productPostDate) res.product.productPostDate = productPostDate
    if(productExpiresAt) res.product.productExpiresAt = productExpiresAt

    try{
        await res.product.save()
        return res.status(200).json({ message: `${productName} updated successfully`})
    }catch(err){
        res.status(500).json({ err: err.message})
    }

}

async function remove(request, response){

    try{
        await response.product.deleteOne();
        return response.status(200).json({ message: 'Product deleted sucessfully' })
    }catch(err){
        return response.status(500).json({ error: err.message }) 
        
    }
}

export {
    index,
    store,
    remove, 
    update
}