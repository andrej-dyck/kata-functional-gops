import { rankedDenominations } from './card'
import { Cards } from './cards'
import { GopsState } from './gops-state'
import * as messages from './messages'
import { EqualPlayer, TopCardPlayer } from './players'
import { randomCards } from './random-cards'

export class GopsGame {

  private readonly initialState: GopsState

  constructor(
    scoreCards = /* IMPURE EXPRESSION */ randomCards(rankedDenominations),
    player1 = /* IMPURE EXPRESSION */ new TopCardPlayer(randomCards(rankedDenominations)),
    player2 = new EqualPlayer(new Cards(rankedDenominations))
  ) {
    this.initialState = new GopsState(scoreCards, player1, player2)
  }

  /* PURE GAME */
  simulate(): Generator<GopsState> {
    return generateSequence(
      this.initialState,
      s => s.revealScoreCard()?.betOnRevealedCard()?.claimRevealedCards()
    )
  }

  /* IMPURE METHOD */
  play() {
    const simulation = [...this.simulate()].slice(1)
    simulation.forEach(s => console.log(messages.formatted(s)))

    const finalState = simulation[simulation.length - 1]!
    console.log(messages.winnerAnnouncement(finalState.winner()))

    assertValidEndOfGame(finalState)
  }
}

/* convenience function */
function* generateSequence<T>(seed: T, next: (c: T) => T | undefined): Generator<T> {
  let c: T | undefined = seed
  while (!!c) {
    yield c
    c = next(c)
  }
}

/* IMPURE FUNCTION; however, you could argue that's not part of the domain, but test code */
function assertValidEndOfGame(finalState: GopsState) {
  console.assert(
    finalState.turn === rankedDenominations.length,
    '13 cards where played')
  console.assert(
    finalState.player1.score
    + finalState.player2.score
    + finalState.revealedCards.sum()
    === 91,
    'all score cards add up to 91')
}
