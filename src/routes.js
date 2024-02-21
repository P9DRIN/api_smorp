import express from 'express'
import { index, remove, store, update } from './controllers/ProductController.js'
import { validateId } from './middlewares/ProductMiddleware.js';
import { accValidateId, validateEmail } from './middlewares/AccountMiddleware.js'
import { accIndex, accStore, accUpdate, accRemove, getAccDotOrder, storeOrders, getAcc } from './controllers/AccountController.js';
import SessionController from './controllers/SessionController.js';

const routes = express.Router();

routes.get('/products', index)

routes.post('/products', store)

routes.put('/products/:id', validateId, update)

routes.delete('/products/:id', validateId, remove)

routes.post('/sessions', SessionController.create)

routes.get('/acc', accIndex)

routes.get('/acc/:email/orders', getAccDotOrder)

routes.get('/acc/:email', getAcc)

routes.post('/acc/:email/orders', storeOrders)

routes.post('/acc', accStore)

routes.put('/acc/:email', validateEmail, accUpdate)

routes.delete('/acc/:id', accValidateId, accRemove)

export default routes