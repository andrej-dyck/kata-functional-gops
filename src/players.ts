import { Card } from './card'
import { Cards } from './cards'

export abstract class Player {

  constructor(
    readonly cards: Cards,
    readonly score: number = 0
  ) { }

  protected abstract with(cards: Cards, score: number): Player

  abstract revealCard(scoreCard: Card): Card | undefined

  scorePoints(value: number): Player {
    return this.with(this.cards, this.score + value)
  }

  withoutCard(card: Card): Player {
    return this.with(this.cards.withoutCard(card), this.score)
  }
}

export class EqualPlayer extends Player {

  with(cards: Cards, score: number): Player {
    return new EqualPlayer(cards, score)
  }

  revealCard(scoreCard: Card): Card | undefined {
    return this.cards.contains(scoreCard) ? scoreCard : undefined
  }
}

export class TopCardPlayer extends Player {

  with(cards: Cards, score: number): Player {
    return new TopCardPlayer(cards, score)
  }

  revealCard(_: Card): Card | undefined {
    return this.cards.topCard()
  }
}
