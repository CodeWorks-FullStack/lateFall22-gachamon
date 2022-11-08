import { appState } from "../AppState.js";
import { gachamansService } from "../Services/GachamansService.js";
import { setHTML, setText } from "../Utils/Writer.js";

// private functions are not, but the controller can still call them

function _drawGachamans() {
  let mans = appState.gachamans.sort((a, b) => b.rarity - a.rarity)
  let template = ''
  mans.forEach(m => template += m.ListTemplate)
  setHTML('gachamans-list', template)
}

function _drawActive() {
  let mon = appState.activeGachamon
  setHTML('active-gachamon', mon.ActiveTemplate)
}

function _drawMyGachamans() {
  console.log('drawing mine');
  let mans = appState.myGachamans
  let template = ''
  mans.forEach(m => template += m.ListTemplate)
  setHTML('my-gachamans', template)
}

function _drawCoins() {
  let coins = appState.coins
  let template = ''
  for (let i = 0; i < coins; i++) {
    template += '🪙'
  }
  setText('coins', template)
}

// Public methods are exported with the controller
export class GachamansController {
  constructor() {
    console.log('gachamans controller loaded');
    // NOTE register listener
    appState.on('activeGachamon', _drawActive)
    appState.on('myGachamans', _drawMyGachamans)
    appState.on('coins', _drawCoins)
    _drawGachamans()
    _drawMyGachamans()
  }


  setActive(name) {
    gachamansService.setActive(name)
  }

  addCoin() {
    console.log('adding coin');
    gachamansService.addCoin()
  }

  getGachamon() {
    gachamansService.getGachamon()
  }

  trashGachamon() {
    if (window.confirm('are you sure you want to trash this?')) {
      gachamansService.trashGachamon()
    }
  }
}