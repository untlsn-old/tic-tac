import { Score } from './score';
const cellClass = 'js-cell'
const playerXMove = 'x'
const playerOMove = 'o'

type playerNMove = typeof playerXMove | typeof playerOMove

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

  private async testCellsGenerator(cfv: string[][], playerNMove: playerNMove, generatorArray: number[][][]) {
    let whoWin = ''
    generatorArray.forEach(async value => {
      whoWin = await this.testCells(cfv, playerNMove, value)
    })
    return whoWin
  }

  private async testCells(cfv: string[][], playerNMove: playerNMove, [first, second, third]: number[][]) {
    if(
      this.getFrom2D(cfv, first) == playerNMove &&   // xoo
      this.getFrom2D(cfv, second) == playerNMove &&   // xoo
      this.getFrom2D(cfv, third) == playerNMove      // xoo
    ) {
      this.colorize(first, second, third)
      this.gameRun = false
      this.score.addScoreAndInsert(playerNMove == playerXMove ? 'x' : 'o')
      return playerNMove
    }
    return ''
  }

  private getFrom2D(arr: string[][], [row, column]: number[]) {
    return arr[row][column]
  }

  private async checkWinStatusHelp(playerNMove: playerNMove) {
    return this.testCellsGenerator(this.cellsFieldValues, playerNMove, [
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ])
  }

  private async colorize(... winPlaces: number[][]) {
    winPlaces.forEach(([row, column]) => {
      this.cells[row*3 + column].classList.add('win-cell')
    })
  }
}

