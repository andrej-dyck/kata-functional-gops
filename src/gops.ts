import { Card, Cards } from './cards'
import { EqualPlayer, RandomPlayer } from './players'

/** GOPS Game -- https://playingcarddecks.com/blogs/how-to-play/gops-game-rules */
export class GopsGame {

  private turn = 0
  private revealedCards: Card[] = []

  constructor(
    private readonly scoreCards = new Cards(),
    private readonly player1 = new RandomPlayer(),
    private readonly player2 = new EqualPlayer()
  ) {
  }

  play() {
    while (this.scoreCards.hasCards()) {
      this.playTurn()
      this.showPlayerScores()
    }

    const score1 = this.player1.currentScore()
    const score2 = this.player2.currentScore()
    if (score1 > score2) {
      console.log('Player 1 wins!')
    } else if (score2 > score1) {
      console.log('Player 2 wins!')
    } else {
      console.log('Tie!')
    }

    this.assertValidEndOfGame()
  }

  private showPlayerScores() {
    const score1 = this.player1.currentScore()
    const score2 = this.player2.currentScore()
    console.log(`Scores: ${score1} vs ${score2}`)
    console.log()
  }

  private playTurn() {
    this.turn++

    const scoreCard = this.scoreCards.popRandomCard()
    this.revealedCards.unshift(scoreCard)

    console.log(`Turn ${this.turn} with bounty:`, scoreCard)

    const card1 = this.player1.playCard(scoreCard)
    const card2 = this.player2.playCard(scoreCard)

    console.log('Player\'s bet:', card1, 'vs', card2)

    if (card1.isHigherRankedThan(card2)) {
      this.player1.scorePoint(this.claimRevealedCardsValue())
    } else if (card2.isHigherRankedThan(card1)) {
      this.player2.scorePoint(this.claimRevealedCardsValue())
    } // tie leaves the scorecard the table for the next turn
  }

  private claimRevealedCardsValue(): number {
    const value = this.revealedCardsValue()
    this.revealedCards = []
    return value
  }

  private revealedCardsValue(): number {
    return this.revealedCards.map(c => c.value()).reduce((c1, c2) => c1 + c2, 0)
  }

  private assertValidEndOfGame() {
    console.assert(this.turn === 13, '13 cards where played')

    const score1 = this.player1.currentScore()
    const score2 = this.player2.currentScore()
    const unclaimedPoints = this.revealedCardsValue()
    console.assert(score1 + score2 + unclaimedPoints === 91, 'all score cards add up to 91')
  }
}
