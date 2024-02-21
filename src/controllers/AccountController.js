import { v4 as uuid } from 'uuid'
import Account from '../models/account.js'

async function accIndex(req, res){
    try{
        const account = await Account.find()
        return res.status(200).json({ account })
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}

async function getAcc(req, res){
    const { email } = req.params

    const obj = { email: email}

    try{
        const account = await Account.find(obj)
        return res.status(200).json({ account })
    }catch(err){
        res.status(500).json({ error: err.message })
    }

}

async function getAccDotOrder(req, res){
   try{
    const account = await Account.find(req.params)
    const orders = account.map(acc => acc.orders)
    return res.status(200).json({ orders })
   }catch(err){
    return res.status(500).json({ error: err.message })
   }

}

async function accStore(req, res){
    const { email, password, fullName, address, orders, createdAt } = req.body

    if(!email && !address){
        return res.status(400).json({ error: 'Missing email e/or address'})
    }

    const account = new Account({
        _id: uuid(),
        email,
        password,
        fullName,
        address,
        orders,
        createdAt,
    })

    try{
        await account.save()
        return res.status(201).json({ message: 'Account added successfully'})
    }catch(err){
        res.status(500).json({ error: err.message })
    }

}

async function storeOrders(req, res){

    const { email, items, paymentMethod, totalValue, deliveryTax } = req.body

    const obj = { email: email.email }

    const account = await Account.findOne(obj)

    const date = new Date()
    const minute = date.getMinutes()
    const hours = date.getHours()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const orderNum = `${minute}${hours}${day}${month}${year}`

    let newOrder = {
        items: items,
        paymentMethod: paymentMethod,
        totalValue: totalValue,
        deliveryTax: deliveryTax,
        orderNum: orderNum,
        id: uuid(),
    }

    account.orders.push(newOrder)

    try{
        await account.save()
        return res.status(200).json({ message: 'orders has been updated successfully' })
    }catch(err){
        return res.status(500).json({ error: err.message })
    }

}


async function accUpdate(req, res){

    console.log(req.body)
    
    const { email, password, address } = req.body

    const { street, houseNumber, zipCode, city, federalUnit } = address

    if(!email){
        return res.status(400).json({ error: 'you must inform an email'})
    }

    if(email) res.account.email = email
    if(password) res.account.password = password
    if(address) res.account.address = address
    if(street) res.account.street = street
    if(houseNumber) res.account.houseNumber = houseNumber
    if(zipCode) res.account.zipCode = zipCode
    if(city) res.account.city = city
    if(federalUnit) res.account.federalUnit = federalUnit

    try{
        await res.account.save()
        return res.status(200).json({ message: 'Account updated successfully!'})
    }catch(err){
        res.status(500).json({ error: err.message })
    }

}


    async function accRemove(req , res){
        try{
            await res.account.deleteOne()
            return res.status(200).json({ message: 'acc deleted successfully'})
        } catch(err){
            return res.status(500).json({ error: err.message })
        }
    }


export { accIndex, accStore, accUpdate, accRemove, getAcc, getAccDotOrder, storeOrders }