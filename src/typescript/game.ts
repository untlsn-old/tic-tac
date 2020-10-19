import { Score } from './score';
const cellClass = 'js-cell'
const playerXMove = 'x'
const playerOMove = 'o'

const getRandomBoolean = () => Math.random() >= .5

export 
class Game {
  cells: NodeListOf<Element>
  isXMove: boolean
  score: Score
  gameRun: boolean


  constructor(score: Score) {
    this.score = score;
    this.cells = document.querySelectorAll(`.${cellClass}`)
    this.isXMove = getRandomBoolean()
    this.gameRun = true
    this.addOnClickToCells()
  }

  reset() {
    this.isXMove = getRandomBoolean()
    this.gameRun = true
  }

  private async addOnClickToCells() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if(this.gameRun)
          this.getSign(cell)
          .then(() => 
            this.checkWinStatus()
          )
          .then(value => {
            if(value) {
              this.score.addScoreAndInsert(value == playerXMove ? 'x' : 'o')
              this.gameRun = false
            }
          })
      })
    })
  }

  private async getSign(cell: Element) {
    if(cell.innerHTML == ''){
      cell.innerHTML = this.isXMove ? playerXMove : playerOMove
      this.isXMove = !this.isXMove
    }
  }

  get cellsFieldValues() {
    return [
      [
        this.cells[0].innerHTML, this.cells[1].innerHTML, this.cells[2].innerHTML
      ],
      [
        this.cells[3].innerHTML, this.cells[4].innerHTML, this.cells[5].innerHTML
      ],
      [
        this.cells[6].innerHTML, this.cells[7].innerHTML, this.cells[8].innerHTML
      ]
    ]
  }

  private async checkWinStatus() {
    return await this.checkWinStatusHelp(playerXMove) ||
    await this.checkWinStatusHelp(playerOMove)
  }

  private async checkWinStatusHelp(playerNMove: typeof playerXMove | typeof playerOMove): Promise<typeof playerNMove> {
    const cfv = this.cellsFieldValues
    if(
      cfv[0][0] == playerNMove &&   // xoo
      cfv[1][0] == playerNMove &&   // xoo
      cfv[2][0] == playerNMove      // xoo
    ) return playerNMove 
    if(
      cfv[0][1] == playerNMove &&   // oxo
      cfv[1][1] == playerNMove &&   // oxo
      cfv[2][1] == playerNMove      // oxo
    ) return playerNMove
    if(
      cfv[0][2] == playerNMove &&   // oox
      cfv[1][2] == playerNMove &&   // oox
      cfv[2][2] == playerNMove      // oox
    ) return playerNMove
    if(
      cfv[0][0] == playerNMove &&   // xxx
      cfv[0][1] == playerNMove &&   // ooo
      cfv[0][2] == playerNMove      // ooo
    ) return playerNMove
    if(
      cfv[1][0] == playerNMove &&   // ooo
      cfv[1][1] == playerNMove &&   // xxx
      cfv[1][2] == playerNMove      // ooo
    ) return playerNMove
    if(
      cfv[2][0] == playerNMove &&   // ooo
      cfv[2][1] == playerNMove &&   // ooo
      cfv[2][2] == playerNMove      // xxx
    ) return playerNMove
    if(
      cfv[0][0] == playerNMove &&   // xoo
      cfv[1][1] == playerNMove &&   // oxo
      cfv[2][2] == playerNMove      // oox
    ) return playerNMove
    if(
      cfv[0][2] == playerNMove &&   // oox
      cfv[1][1] == playerNMove &&   // oxo
      cfv[2][0] == playerNMove      // xoo
    ) return playerNMove
  }
}

