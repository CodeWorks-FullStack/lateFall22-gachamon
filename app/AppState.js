import { Gachamon } from "./Models/Gachamon.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  // NOTE create class objects with raw constructor
  // gachamans = [
  //   new Gachamon('Albert', '🐩', 1, 50),
  //   new Gachamon('Koko', '🦍', 1, 40),
  //   new Gachamon('Kim', '🦩', 1, 10)
  // ]

  // NOTE create class objects with data constructor
  gachamans = [
    new Gachamon({
      name: "Xanther",
      emoji: '🦈',
      colorVariant: 1,
      rarity: 18
    }),
    new Gachamon({
      name: "Oslo",
      emoji: '🦧',
      colorVariant: 1,
      rarity: 24
    }),
    new Gachamon({
      name: "French Oslo",
      emoji: '🦧',
      colorVariant: 1,
      rarity: 1
    }),
    new Gachamon({
      name: "Nega-Oslo",
      emoji: '🦧',
      colorVariant: 3,
      rarity: 1
    }),
    new Gachamon({
      name: "Albert",
      emoji: '🐩',
      colorVariant: 1,
      rarity: 11
    }),
    new Gachamon({
      name: "Sly",
      emoji: '🦐',
      colorVariant: 1,
      rarity: 10
    }),
    new Gachamon({
      name: "Gold Sly",
      emoji: '🦐',
      colorVariant: 2,
      rarity: 8
    }),
    new Gachamon({
      name: "Justin",
      emoji: '🐖',
      colorVariant: 1,
      rarity: 7
    }),
    new Gachamon({
      name: "Glowing Justin",
      emoji: '🐖',
      colorVariant: 2,
      rarity: 3
    }),
    new Gachamon({
      name: "Glistening Justin",
      emoji: '🐖',
      colorVariant: 3,
      rarity: 2
    }),
    new Gachamon({
      name: 'Koko',
      emoji: '🦍',
      colorVariant: 1,
      rarity: 4
    }),
    new Gachamon({
      name: 'Albino Koko',
      emoji: '🦍',
      colorVariant: 3,
      rarity: 2
    }),
    new Gachamon({
      name: 'Kim',
      emoji: '🦩',
      colorVariant: 1,
      rarity: 3
    }),
    new Gachamon({
      name: 'Raymond',
      emoji: '🦣',
      colorVariant: 1,
      rarity: 3
    }),
    new Gachamon({
      name: 'Gold Raymond',
      emoji: '🦣',
      colorVariant: 2,
      rarity: 2
    })
  ]

  activeGachamon = null

  coins = 0

  // NOTE loading from state
  // ...........where they are stored..| what they will be when loaded
  myGachamans = loadState('myGachamans', [Gachamon])
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
