import { Card, valueOf } from './card'

export type Cards = Card[]

/* queries */
export const topCard = (cards: Cards): Card | undefined => cards[0]
export const containedIn = (cards: Cards, card: Card) => !!cards.find(c => c === card)
export const sumOf = (cards: Cards) => cards.map(c => valueOf(c)).reduce((c1, c2) => c1 + c2, 0)

/* transition */
export const withCard = (cards: Cards, card: Card) => [card, ...cards]
export const withoutCard = (cards: Cards, card: Card) => cards.filter(c => c !== card)

/* convenience */
export function takeTopCard(cards: Cards): { cards: Cards, card: Card | undefined } {
  let card = topCard(cards)
  return {
    cards: !!card ? withoutCard(cards, card) : cards,
    card: card
  }
}
