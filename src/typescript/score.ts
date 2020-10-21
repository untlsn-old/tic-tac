type player = 'x' | 'o'

const scoreXClass = 'js-score-x'
const scoreOClass = 'js-score-o'

export
class Score {
  playerXScore: number
  playerOScore: number
  playerXElement: Element
  playerOElement: Element

  constructor(startScoreX = 0, startScoreO = 0) {
    this.playerOScore = startScoreX
    this.playerXScore = startScoreO

    this.playerXElement = document.querySelector(`.${scoreXClass}`)!
    this.playerOElement = document.querySelector(`.${scoreOClass}`)!
  }

  async addScoreTo(player: player) {
    if(player == 'x')
      this.playerXScore++
    else
      this.playerOScore++
  }

  async insertScore() {
    this.playerXElement.innerHTML = this.playerXScore.toString()
    this.playerOElement.innerHTML = this.playerOScore.toString()
  }

  async addScoreAndInsert(player: player) {
    this.addScoreTo(player)
    this.insertScore()
  }

  async clearScore() {
    this.playerOScore = 0
    this.playerXScore = 0
  }

  async clearScoreAndInsert() {
    this.clearScore()
    this.insertScore()
  }
}