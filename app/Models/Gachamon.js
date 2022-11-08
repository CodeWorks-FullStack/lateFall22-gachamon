import { appState } from "../AppState.js"



export class Gachamon {
  constructor(data) {
    this.name = data.name
    this.emoji = data.emoji
    this.colorVariant = data.colorVariant
    this.rarity = data.rarity
  }

  get ListTemplate() {
    return `<h3 class="col-1 p-2 selectable color-${this.colorVariant}" title="${this.name}" onclick="app.gachamansController.setActive('${this.name}')">${this.emoji}</h3>`
  }

  get ActiveTemplate() {
    return `
  <div class="col-8 p-2 bg-light rounded shadow text-primary">
    <h2>${this.name}</h2>
    <div class="gachamon-detail color-${this.colorVariant}">${this.emoji}</div>
    <h4>${this.rarity}% : ${this.ComputeQuantity}</h4>
    ${this.ComputeDeleteButton}
  </div>
    `
  }

  get ComputeDeleteButton() {
    let inCollection = appState.myGachamans.find(m => m.name == this.name)
    if (inCollection) {
      return `  <button class="btn btn-outline-danger"onclick="app.gachamansController.trashGachamon()"><i class="mdi mdi-delete-alert-outline"></i></button>`
    } else {
      return ''
    }
  }

  get ComputeQuantity() {
    let quantity = appState.myGachamans.filter(m => m.name == this.name).length
    console.log('you have', quantity, this.name);
    return quantity
  }
}