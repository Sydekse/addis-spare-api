import { Rating } from '../entities/rating.entity';
export class RatingUpdatedEvent {
  constructor(public readonly module: Rating) {}
}
