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
  async endGame() {
    this.gameRun = false
  }
  async changePlayer() {
    this.isXMove = !this.isXMove
  }
}