export class Card {

  constructor(readonly denomination: Denomination) { }

  isSameRankAs(other: Card): boolean {
    return this.value() === other.value()
  }

  isHigherRankedThan(other: Card): boolean {
    return this.value() > other.value()
  }

  value(): number {
    return rankedDenominations.indexOf(this.denomination) + 1
  }

  toString(): string {
    return `Card('${this.denomination}')`
  }
}

export type Denomination = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'
export const rankedDenominations: Denomination[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
