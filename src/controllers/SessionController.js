
import jwt from 'jsonwebtoken'
import Account from '../models/account.js'
import * as dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

const SECRET = process.env.APP_SECRET
 
class SessionController {

    async create(req, res){
        // const checkPassword = (user, password) => bcrypt.compare(password, user.password)

        const { email, password } = req.body

        const user = await Account.findOne({ email })
        
        const checkPassword = () => {
            if(user && password === user.password){
                return 1
            }
            if(user && password !== user.password){
                return 0
            }
        } 
        if (!user){
            return res.status(401).json({error: 'invalid user or password '})
        }
        if(checkPassword() === 0){
            return res.status(401).json({error: 'invalid user or password '})
        }

        const { _id } = user

        return res.json({
            user: {
                email,
            }, 
            token: jwt.sign({ _id }, SECRET, {
                expiresIn: '1d',
            })
        })

    }
}

export default new SessionController();