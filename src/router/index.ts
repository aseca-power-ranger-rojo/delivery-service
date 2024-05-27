import { Router } from 'express'
import { deliverersController } from '@domains/deliverer'
import { ordersController } from '@domains/orders'

export const router = Router()

router.use('/deliverers', deliverersController);
router.use('/orders', ordersController);