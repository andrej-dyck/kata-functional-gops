import { Bet, winner } from './bet'
import { Card } from './card'
import { Cards, sumOf, takeTopCard, withCard } from './cards'
import { pipe, possibly } from './functional-extensions'
import { playCard, Player, PlayerName, withScoredPoints } from './players'

export type InitialState = { scoreCards: Cards, player1: Player, player2: Player }
type RevealedState = InitialState & { turn: number, bounty: Card, revealedCards: Cards }
type BetState = RevealedState & { bet: Bet }
export type PlayedState = BetState & { winner: PlayerName | undefined }

/* transition */
export const nextTurn: (state: InitialState | PlayedState) => PlayedState | undefined =
  pipe(revealBounty)
    .then(possibly(betOnCard))
    .then(possibly(claimRevealedCards))
    .invoke

/* transition steps */
function revealBounty(state: InitialState | PlayedState): RevealedState | undefined {
  const { card: bounty, cards: scoreCards } = takeTopCard(state.scoreCards)

  return !!bounty ? {
    ...state,
    scoreCards,
    bounty,
    turn: incrementTurn(state),
    revealedCards: revealedCardsWith(state, bounty)
  } : undefined
}

const incrementTurn = (s: {} | { turn: number }) =>
  'turn' in s ? s.turn + 1 : 1

const revealedCardsWith = (s: {} | { revealedCards: Cards }, c: Card) =>
  'revealedCards' in s ? withCard(s.revealedCards, c) : [c]

function betOnCard(state: RevealedState): BetState | undefined {
  const { player: player1, card: card1 } = playCard(state.player1, state.bounty)
  const { player: player2, card: card2 } = playCard(state.player2, state.bounty)

  return !!card1 && !!card2
    ? { ...state, player1, player2, bet: { card1, card2 } }
    : undefined
}

function claimRevealedCards(state: BetState): PlayedState {
  const claim = {
    'tie': (_: number) => ({ winner: undefined }),
    'card 1': (p: number) => ({ player1: withScoredPoints(state.player1, p), winner: 'Player 1' as PlayerName }),
    'card 2': (p: number) => ({ player2: withScoredPoints(state.player2, p), winner: 'Player 2' as PlayerName })
  }[winner(state.bet)]

  const claimed = claim(sumOf(state.revealedCards))

  return {
    ...state,
    ...claimed,
    revealedCards: !!claimed.winner ? [] : state.revealedCards
  }
}
