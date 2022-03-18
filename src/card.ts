export type Card = Denomination
export type Denomination = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export const valueOf = (c: Card, rank: Denomination[] = rankedDenominations) => rank.indexOf(c) + 1

export const areSameRank = (c1: Card, c2: Card) => valueOf(c1) === valueOf(c2)
export const isHigherRankedThan = (c1: Card, c2: Card) => valueOf(c1) > valueOf(c2)

export const rankedDenominations: Denomination[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
