import { PrismaClient } from "@prisma/client";
import { CreateDelivererDTO, GetDelivererDTO } from "../dto";

export class DeliverersRepository {
    constructor(private readonly db: PrismaClient) {}

    async getDeliverers(): Promise<GetDelivererDTO[]> {
        const deliverers = await this.db.deliverer.findMany({
            select: {
              id: true,
              name: true,
              surname: true
            }
        });
        return deliverers.map(deliverer => new GetDelivererDTO(deliverer));
    }

    async createDeliverer(data: CreateDelivererDTO): Promise<void> {
        await this.db.deliverer.create({
            data: {
                ...data
            }
        });
    }

}