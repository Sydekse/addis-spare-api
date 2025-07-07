import { Injectable } from "@nestjs/common";
import { UpdateOrderDto } from "../../dto/update-order.dto";
import { Order } from "src/modules/order/domain/entities/order.entity";

@Injectable()
export class UpdateOrderUseCase {
  constructor() {}

  async execute(id: string, dto: UpdateOrderDto): Promise<Order> {
    throw new Error("not yet implemented");
  }
}
