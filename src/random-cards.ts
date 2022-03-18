import { Card } from './card'

/* creation */
export const randomCards = (
  cards: Card[],
  revealSequence: number[] = /* IMPURE EXPRESSION */ shuffle(range(cards.length))
) =>
  sortByArray(cards, revealSequence)

/* IMPURE FUNCTION */
const shuffle = <T>(array: T[]) => array.sort(() => Math.random() - 0.5)

/* convenience */
const range = (until: number) => [...Array(until).keys()]

const sortByArray = <T>(array: T[], numbers: number[]) =>
  ensureSameLength(array, numbers)
    .map((val, index) => ({ order: val, value: array[index]! }))
    .sort((a, b) => a.order - b.order)
    .map(v => v.value!)

function ensureSameLength<T>(array: T[], numbers: number[]): number[] {
  if (numbers.length === array.length) return numbers

  return numbers.length > array.length
    ? numbers.slice(0, array.length)
    : [...numbers, ...Array(array.length - numbers.length)]
}
