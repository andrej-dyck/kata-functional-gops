# GOPS -- Pure Functions Kata

GOPS (Game Of Pure Strategy) is a simple bidding game for two players and is played with a standard deck of cards.

Read the rules here: https://playingcarddecks.com/blogs/how-to-play/gops-game-rules.

```
npm run start -- executes src/index.ts once
npm run start:dev -- executes src/index.ts and re-runs on any file changes
```

### Task
Refactor this solution and maximize the number of pure functions to increase reasoning, testability, and gain many other benefits; like efficiency, reuse, composition, and referential transparency.

### What are Pure Functions?
> A pure function is a deterministic function (in mathematical terms) without any observable side effects.

In other words, a pure function is a function that depends only on its declared input parameters and its algorithm to produce its output. Further, it does not read, modify or write any values of 'the outside world' (i.e., outside the function's scope).

Here's a good brief video explanation: [Codexpanse - Pure Functions](https://www.youtube.com/watch?v=dZ41D6LDSBg) 
