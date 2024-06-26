import { BadRequestException, BodyValidation, db } from '@utils';
import { Request, Response, Router } from 'express'
import { OrdersService } from '../service';
import { OrdersRepository } from '../repository';
import httpStatus from 'http-status';
import { GetOrderDTO, CreateOrderDTO } from '../dto';
import { OrderStatus } from '@prisma/client';
import { DeliverersService } from '@domains/deliverer/service';
import { DeliverersRepository } from '@domains/deliverer/repository';

export const ordersController = Router();

const service: OrdersService = new OrdersService(new OrdersRepository(db), new DeliverersService(new DeliverersRepository(db)))

ordersController.get('/', async(req: Request, res: Response, next) => {
  try {
    const orders: GetOrderDTO[] = await service.getOrders();
    return res.status(httpStatus.OK).json(orders);
  } catch (error) {
    next(error);
  }
});
  
ordersController.post('/', BodyValidation(CreateOrderDTO),  async(req: Request, res: Response, next) => {
  try {
    const data = req.body;
    await service.createOrder(data);
    return res.status(httpStatus.CREATED).json();
  } catch (error) {
    next(error);
  }
});
  
ordersController.patch('/:orderId/:status', async(req: Request, res: Response, next) => {
  try {
    const status = (OrderStatus as any)[req.params.status.toUpperCase()]

    if (status === undefined) throw new BadRequestException('Invalid status');
    await service.updateOrderStatus(req.params.orderId, status as OrderStatus)
    
    return res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});