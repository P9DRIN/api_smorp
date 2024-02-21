import { validate as isUuid } from 'uuid'

import Account from '../models/account.js';


async function accValidateId(req, res, next){
    const { id } = req.params;

    if(!isUuid(id)){
        return res.status(400).json({ error: 'invalid ID'})
    }
    try{
        const account = await Account.findById(id);
        res.account = account
        if(!account){
            return res.status(404).json({ error: 'account not found!'});
        }
    }catch(err){
        return res.status(500).json({ error: err.message })
    }

    next()
}

async function validateEmail(req, res, next){

    const { email } = req.params

    const obj = {
        email: email
    }

    try{
        const account = await Account.findOne(obj)
        res.account = account
        if(!account){
            return res.status(404).json({ error: 'account not found'})
        }
        }catch(err){
            return res.status(500).json({error: err.message})
    }
    next()

}


export {
    accValidateId,
    validateEmail
}