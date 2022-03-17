import { Bet } from './bet'
import { Card } from './card'
import { GopsState } from './gops-state'

export function formatted(state: GopsState): string {
  return state.lastBounty && state.lastBet
    ? bounty(state.turn, state.lastBounty) + '\n'
    + bets(state.lastBet) + '\n'
    + score(state.player1, state.player2) + '\n'
    : ''
}

export function bounty(turn: number, card: Card): string {
  return `Turn ${turn} with bounty: ${card}`
}

export function bets(bet: Bet): string {
  return `Player\'s bet: ${bet.card1} vs ${bet.card2}`
}

export function score(player1: { score: number }, player2: { score: number }): string {
  return `Scores: ${player1.score} vs ${player2.score}`
}

export function winnerAnnouncement(winner: 'Player 1' | 'Player 2' | undefined): string {
  return !!winner ? `${winner} wins!` : 'Tie!'
}
