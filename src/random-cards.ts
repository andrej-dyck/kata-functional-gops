import { Card, Denomination } from './card'
import { Cards } from './cards'

export function randomCards(
  cards: (Denomination | Card)[],
  revealSequence: number[] = /* IMPURE EXPRESSION */ shuffle([...Array(cards.length).keys()])
): Cards {
  return new Cards(sortByArray(cards, revealSequence))
}

/* IMPURE FUNCTION */
function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5)
}

function sortByArray<T>(array: T[], numbers: number[]): T[] {
  return ensureSameLength(array, numbers)
    .map((val, index) => ({ order: val, value: array[index]! }))
    .sort((a, b) => a.order - b.order)
    .map(v => v.value!)
}

function ensureSameLength<T>(array: T[], numbers: number[]): number[] {
  if (numbers.length === array.length) return numbers

  return numbers.length > array.length
    ? numbers.slice(0, array.length)
    : [...numbers, ...Array(array.length - numbers.length)]
}
