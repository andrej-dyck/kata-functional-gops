import { areSameRank, Card, isHigherRankedThan } from './card'

export type Bet = { card1: Card, card2: Card }

export const isTie = (b: Bet) => areSameRank(b.card1, b.card2)

export const winner = (b: Bet): 'card 1' | 'card 2' | 'tie' =>
  isTie(b) ? 'tie' : (isHigherRankedThan(b.card1, b.card2) ? 'card 1' : 'card 2')
