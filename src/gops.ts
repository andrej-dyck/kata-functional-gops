import assert from 'assert'
import { rankedDenominations } from './card'
import { sumOf } from './cards'
import { generateSequence, last } from './functional-extensions'
import { InitialState, nextTurn, PlayedState } from './gops-state'
import * as messages from './messages'
import { createEqualPlayer, createTopCardPlayer } from './players'
import { randomCards } from './random-cards'

/* PURE GOPS GAME */
export const simulate = (initialState: InitialState) => generateSequence(nextTurn(initialState), nextTurn)

/* IMPURE FUNCTION */
export function play(initialState: InitialState = {
  scoreCards: /* IMPURE EXPRESSION */ randomCards(rankedDenominations),
  player1: /* IMPURE EXPRESSION */ createTopCardPlayer(randomCards(rankedDenominations)),
  player2: createEqualPlayer(rankedDenominations)
}) {
  const simulation = [...simulate(initialState)]
  simulation.forEach(s => console.log(messages.formatted(s) + '\n'))

  const finalState = last(simulation)
  console.log(messages.winnerAnnouncement(finalState?.winner))

  assertValidEndOfGame(finalState)
}

/* IMPURE FUNCTION; however, you could argue that's not part of the domain, but test code */
function assertValidEndOfGame(finalState: PlayedState | undefined) {
  assert(finalState,
    'a game has been played')
  assert(finalState.turn === rankedDenominations.length,
    '13 cards where played')
  assert(finalState.player1.score + finalState.player2.score + sumOf(finalState.revealedCards) === 91,
    'all score cards add up to 91')
}
