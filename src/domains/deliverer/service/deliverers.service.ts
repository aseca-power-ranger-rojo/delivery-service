import { CreateDelivererDTO, GetDelivererDTO } from "../dto";
import { DeliverersRepository } from "../repository";


export class DeliverersService {
    constructor(private readonly repository: DeliverersRepository) {}

    async getDeliverers(): Promise<GetDelivererDTO[]> {
        return await this.repository.getDeliverers();
    }

    async createDeliverer(data: CreateDelivererDTO): Promise<void> {
        await this.repository.createDeliverer(data);
    }
}