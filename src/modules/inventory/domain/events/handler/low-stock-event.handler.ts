import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LowStockEvent } from '../low-stock.event';

@EventsHandler(LowStockEvent)
export class LowStockHandler implements IEventHandler<LowStockEvent> {
  handle({ inventory }: LowStockEvent) {
    // TODO: comeback again after the notification module is completed
    console.log('Inventory updated :', inventory);
  }
}
