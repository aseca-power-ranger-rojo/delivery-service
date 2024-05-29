import { OrderStatus } from "@prisma/client";
import { CreateOrderDTO, GetOrderDTO } from "../dto";
import { OrdersRepository } from "../repository";
import { DeliverersService } from "@domains/deliverer/service";
import axios from "axios";

const controlTowerURL = process.env.CONTROL_TOWER_URL + '/api/orders';

export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly delivererService: DeliverersService
  ) {}

  async getOrders(): Promise<GetOrderDTO[]> {
    return await this.repository.getOrders();
  }

  async createOrder(data: CreateOrderDTO): Promise<void> {
    const deliverers = await this.delivererService.getDeliverers();
    const delivererId = deliverers[Math.floor(Math.random() * deliverers.length)].id;
    await this.repository.createOrder(data, delivererId);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await this.repository.updateOrderStatus(orderId, status);
    await axios.patch(`${controlTowerURL}/${orderId}/DELIVERY/${status}`);
  }

}