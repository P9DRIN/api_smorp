import { validate as isUuid } from 'uuid'

import Product from "../models/product.js";


async function validateId(req, res, next){
    const { id } = req.params;

    if(!isUuid(id)){
        return res.status(400).json({ error: 'invalid ID'})
    }
    try{
        const product = await Product.findById(id);
        res.product = product
        if(!product){
            return res.status(404).json({ error: 'product not found!'});
        }
    }catch(err){
        return res.status(500).json({ error: err.message })
    }

    next()
}

export {
    validateId
}