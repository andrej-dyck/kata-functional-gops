import { Bet } from './bet'
import { Card } from './card'
import { PlayedState } from './gops-state'
import { PlayerName } from './players'

export const formatted = (state: PlayedState) =>
  bounty(state.turn, state.bounty) + '\n'
  + bets(state.bet) + '\n'
  + score(state.player1, state.player2)

export const bounty = (turn: number, card: Card) =>
  `Turn ${turn} with bounty: '${card}'`

export const bets = (bet: Bet) =>
  `Player\'s bet: '${bet.card1}' vs '${bet.card2}'`

export const score = (player1: { score: number }, player2: { score: number }) =>
  `Scores: ${player1.score} vs ${player2.score}`

export const winnerAnnouncement = (winner: PlayerName | undefined) =>
  !!winner ? `${winner} wins!` : 'Tie!' // in a full game (91 points), there shouldn't be a tie
