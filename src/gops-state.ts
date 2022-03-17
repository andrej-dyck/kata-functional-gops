import { Bet } from './bet'
import { Card } from './card'
import { Cards } from './cards'
import { Player } from './players'

export class GopsState {

  constructor(
    readonly scoreCards: Cards,
    readonly player1: Player,
    readonly player2: Player,
    readonly turn: number = 0,
    readonly revealedCards: Cards = new Cards([]),
    // needed for output / history -> to avoid undefined, state can be separated into two types (initial and with bets)
    readonly lastBounty: Card | undefined = undefined,
    readonly lastBet: Bet | undefined = undefined
  ) { }

  revealScoreCard(): GopsState | undefined {
    const card = this.scoreCards.topCard()

    return !!card ? this.with({
      turn: this.turn + 1,
      scoreCards: this.scoreCards.withoutCard(card),
      revealedCards: this.revealedCards.withCard(card),
      lastBounty: card
    }) : undefined
  }

  betOnRevealedCard(): GopsState | undefined {
    if (!this.lastBounty) return undefined

    const card1 = this.player1.revealCard(this.lastBounty)
    const card2 = this.player2.revealCard(this.lastBounty)

    return !!card1 && !!card2 ? this.with({
      player1: this.player1.withoutCard(card1),
      player2: this.player1.withoutCard(card2),
      lastBet: new Bet(card1, card2)
    }) : undefined
  }

  claimRevealedCards(): GopsState | undefined {
    if (!this.lastBet) return undefined

    const claimed = this.playerWithClaimedPoints(this.lastBet, this.revealedCards.sum())

    return claimed === undefined
      ? this
      : this.with({ revealedCards: new Cards([]), ...claimed })
  }

  private playerWithClaimedPoints(bet: Bet, points: number): Partial<GopsState> | undefined {
    if (bet.isTie()) return undefined

    return bet.isCard1HigherRanked()
      ? { player1: this.player1.scorePoints(points) }
      : { player2: this.player2.scorePoints(points) }
  }

  winner(): 'Player 1' | 'Player 2' | undefined {
    if (this.player1.score === this.player2.score) return undefined

    return this.player1.score > this.player2.score ? 'Player 1' : 'Player 2'
  }

  with(partial: Partial<GopsState>): GopsState {
    return new GopsState(
      partial.scoreCards ?? this.scoreCards,
      partial.player1 ?? this.player1,
      partial.player2 ?? this.player2,
      partial.turn ?? this.turn,
      partial.revealedCards ?? this.revealedCards,
      partial.lastBounty ?? this.lastBounty,
      partial.lastBet ?? this.lastBet
    )
  }
}
