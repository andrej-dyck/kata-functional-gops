import { Card, Denomination } from './card'

export class Cards {

  private readonly cards: Card[]

  constructor(cards: (Denomination | Card)[]) {
    this.cards = cards.map(c => c instanceof Card ? c : new Card(c))
  }

  topCard(): Card | undefined {
    return this.cards[0]
  }

  withCard(card: Card): Cards {
    return new Cards([card, ...this.cards])
  }

  withoutCard(card: Card): Cards {
    return new Cards(this.cards.filter(c => c.denomination !== card.denomination))
  }

  contains(card: Card): boolean {
    return !!this.cards.find(c => c.denomination === card.denomination)
  }

  sum(): number {
    return this.cards.map(c => c.value()).reduce((c1, c2) => c1 + c2, 0)
  }

  toString(): string {
    return this.cards.join(', ')
  }
}
