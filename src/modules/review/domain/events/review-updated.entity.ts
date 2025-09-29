import { Review } from 'src/modules/review/domain/entities/review.entity';

export class ReviewUpdatedEvent {
  constructor(public review: Review) {}
}
