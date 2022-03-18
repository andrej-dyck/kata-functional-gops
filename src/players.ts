import { Card } from './card'
import { Cards, containedIn, topCard, withoutCard as cardsWithout } from './cards'

export type Player = { cards: Cards, score: number, revealCard: PlayerStrategy }
export type PlayerName = 'Player 1' | 'Player 2'

/* creation */
export const createPlayer = (strategy: PlayerStrategy) =>
  (cards: Cards) => ({ cards, score: 0, revealCard: strategy })

type PlayerStrategy = (cards: Cards, scoreCard: Card) => Card | undefined

export const createEqualPlayer = createPlayer(
  (cards, scoreCard) => containedIn(cards, scoreCard) ? scoreCard : undefined
)

export const createTopCardPlayer = createPlayer(
  (cards, _) => topCard(cards)
)

/* transition */
export const withScoredPoints = (p: Player, points: number) => ({ ...p, score: p.score + points })
export const withoutCard = (p: Player, card: Card) => ({ ...p, cards: cardsWithout(p.cards, card) })

/* convenience */
export function playCard(player: Player, scoreCard: Card): { player: Player, card: Card | undefined } {
  const card = player.revealCard(player.cards, scoreCard)
  return {
    player: !!card ? withoutCard(player, card) : player,
    card
  }
}

