export 
class BooleanField {
  isXMove: boolean
  gameRun: boolean

  constructor() {
    this.isXMove = this.random
    this.gameRun = true
  }
  get random() {
    return Math.random() >= .5
  }
  endGame() {
    this.gameRun = false
  }
}