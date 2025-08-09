import { Review } from 'src/modules/review/domain/entities/review.entity';
export class ReviewCreatedEvent {
  constructor(public review: Review) {}
}
