import { GetDelivererDTO } from "@domains/deliverer/dto";
import { OrderStatus } from "@prisma/client";
import { IsUUID, IsNotEmpty } from "class-validator";

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsUUID()
    orderId!: string;

    @IsNotEmpty()
    @IsUUID()
    delivererId!: string;
}

export class GetOrderDTO {
    constructor(order: GetOrderDTO) {
        this.id = order.id;
        this.orderId = order.orderId;
        this.status = order.status;
        this.deliverer = new GetDelivererDTO(order.deliverer);
    }

    id: string;
    orderId: string;
    status: OrderStatus;
    deliverer: GetDelivererDTO;
}