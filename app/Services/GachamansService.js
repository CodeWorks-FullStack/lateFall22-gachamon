import { appState } from "../AppState.js"
import { saveState } from "../Utils/Store.js";

function _rollGachamon() {
  let mons = appState.gachamans.sort((a, b) => b.rarity - a.rarity)
  let randomNum = Math.round(Math.random() * 100)
  console.log('ROlling', randomNum);
  let chance = 0
  let rolled = mons.find(m => {
    chance += m.rarity
    if (randomNum <= chance) {
      return true
    }
    return false
  })
  return rolled
}


class GachamansService {

  setActive(name) {
    let mon = appState.gachamans.find(m => m.name == name)
    console.log('selected', mon);
    appState.activeGachamon = mon
    console.log(appState);
  }

  addCoin() {
    // NOTE use the '=' to trigger the listener
    appState.coins = appState.coins + 1
  }

  getGachamon() {
    if (appState.coins > 0) {
      console.warn('Gacha Gacha mon!');
      appState.coins--
      let mon = _rollGachamon() // get random based on rarity and roll (yeah it's weird and complicated)
      // save to my collection
      // ... spreads the items out, into the new array
      // listener is only trigger whe '=' is used
      appState.myGachamans = [...appState.myGachamans, mon]
      saveState('myGachamans', appState.myGachamans)
      // make active
      appState.activeGachamon = mon
      console.log(appState.myGachamans);
    } else {
      console.warn('no coin')
    }
  }

  trashGachamon() {
    console.log('trashing');
    let mon = appState.activeGachamon
    let gachaIndex = appState.myGachamans.findIndex(m => m.name == mon.name)
    console.log(gachaIndex);
    // the if keeps it from erasing if nothing is found
    if (gachaIndex != -1) {
      appState.myGachamans.splice(gachaIndex, 1)
      saveState('myGachamans', appState.myGachamans)
    }
    // appState.myGachamans = appState.myGachamans // this works this triggers the listener (but looks weird)
    // NOTE emit manually triggers all listeners tied to the given input
    appState.emit('myGachamans')
    appState.emit('activeGachamon')
  }

}

export const gachamansService = new GachamansService()