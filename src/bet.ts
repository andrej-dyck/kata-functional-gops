import { Card } from './card'

export class Bet {

  constructor(
    readonly card1: Card,
    readonly card2: Card
  ) {}

  isTie(): boolean {
    return this.card1.isSameRankAs(this.card2)
  }

  isCard1HigherRanked(): boolean {
    return this.card1.isHigherRankedThan(this.card2)
  }
}
