import { IsNotEmpty, IsString } from "class-validator";

export class CreateDelivererDTO {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    surname!: string
}

export class GetDelivererDTO {
    constructor(deliverer: GetDelivererDTO) {
        this.id = deliverer.id;
        this.name = deliverer.name;
        this.surname = deliverer.surname;
    }

    id: string
    name: string
    surname: string
}