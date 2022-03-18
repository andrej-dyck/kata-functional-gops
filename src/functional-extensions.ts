export function* generateSequence<T>(seed: T | undefined, next: (c: T) => T | undefined): Generator<T> {
  let n: T | undefined = seed
  while (!!n) {
    yield n
    n = next(n)
  }
}

export const pipe = <A, B>(fn: (_: A) => B) => ({
  then: <C>(g: (_: B) => C) => pipe((arg: A) => g(fn(arg))),
  invoke: fn
})

export const possibly = <A, B>(fn: (_: A) => B) => (arg: A | undefined) =>
  !!arg ? fn(arg) : undefined

export const last = <T>(array: T[]) => array[array.length - 1]
