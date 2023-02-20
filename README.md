# TBT-problem
Travellers, bridge and torch problem

## Requirements
- [Node JS](https://nodejs.org/en/)
- [Node Package: NPX](https://www.npmjs.com/package/npx)

## Generate JS script
```
$ npx tsc state_graph.ts
```

## Run JS Script
```
$ node state_graph.js
```

## Output
```ts
P1: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ] & P2: [ ]: torch time left =>  12
|   P1: [ { name: 'A', timeToTravel: 1 } ] & P2: [ { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ]: torch time left =>  7
|   |   P1: [ { name: 'A', timeToTravel: 1 } { name: 'C', timeToTravel: 5 } ] & P2: [ { name: 'B', timeToTravel: 3 } ]: torch time left =>  2
|   |   P1: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } ] & P2: [ { name: 'C', timeToTravel: 5 } ]: torch time left =>  4
|   |   |   P1: [ ] & P2: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ]: torch time left =>  1
|   P1: [ { name: 'B', timeToTravel: 3 } ] & P2: [ { name: 'A', timeToTravel: 1 } { name: 'C', timeToTravel: 5 } ]: torch time left =>  7
|   |   P1: [ { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ] & P2: [ { name: 'A', timeToTravel: 1 } ]: torch time left =>  2
|   |   P1: [ { name: 'B', timeToTravel: 3 } { name: 'A', timeToTravel: 1 } ] & P2: [ { name: 'C', timeToTravel: 5 } ]: torch time left =>  6
|   |   |   P1: [ ] & P2: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ]: torch time left =>  3
|   P1: [ { name: 'C', timeToTravel: 5 } ] & P2: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } ]: torch time left =>  9
|   |   P1: [ { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ] & P2: [ { name: 'A', timeToTravel: 1 } ]: torch time left =>  6
|   |   |   P1: [ ] & P2: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ]: torch time left =>  1
|   |   P1: [ { name: 'C', timeToTravel: 5 } { name: 'A', timeToTravel: 1 } ] & P2: [ { name: 'B', timeToTravel: 3 } ]: torch time left =>  8
|   |   |   P1: [ ] & P2: [ { name: 'A', timeToTravel: 1 } { name: 'B', timeToTravel: 3 } { name: 'C', timeToTravel: 5 } ]: torch time left =>  3
```
