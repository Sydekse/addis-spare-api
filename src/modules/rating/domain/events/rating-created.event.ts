import { Rating } from '../entities/rating.entity';

export class RatingCreatedEvent {
  constructor(public readonly module: Rating) {}
}
