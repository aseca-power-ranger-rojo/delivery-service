import { BodyValidation, db } from '@utils';
import { Request, Response, Router } from 'express'
import { CreateDelivererDTO, GetDelivererDTO } from '../dto';
import httpStatus from 'http-status';
import { DeliverersService } from '../service';
import { DeliverersRepository } from '../repository';

export const deliverersController = Router();

const service: DeliverersService = new DeliverersService(new DeliverersRepository(db))

deliverersController.get('/',  async(req: Request, res: Response) => {
    const deliverers: GetDelivererDTO[] = await service.getDeliverers();
    return res.status(httpStatus.OK).json(deliverers);
  });
  
  deliverersController.post('/', BodyValidation(CreateDelivererDTO), async(req: Request, res: Response) => {
  const data = req.body;
  await service.createDeliverer(data);
  return res.status(httpStatus.CREATED).json();
});
