import { Card, Cards } from './cards'

export abstract class Player {

  protected readonly cards = new Cards()
  private score = 0

  scorePoint(value: number) {
    this.score += value
  }

  currentScore(): number {
    return this.score
  }

  abstract playCard(scoreCard: Card): Card
}

export class RandomPlayer extends Player {

  playCard(_: Card): Card {
    return this.cards.popRandomCard()
  }
}

export class EqualPlayer extends Player {

  playCard(scoreCard: Card): Card {
    this.cards.removeCard(scoreCard)
    return scoreCard
  }
}