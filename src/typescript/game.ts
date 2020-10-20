import { Score } from './score';
import { Cell } from './cell';
import { CellsWrapper } from './cells-wrapper';
const cellClass = 'js-cell'
const playerXMove = 'x'
const playerOMove = 'o'

type playerNMove = typeof playerXMove | typeof playerOMove

const getRandomBoolean = () => Math.random() >= .5

export 
class Game {
  cells: CellsWrapper
  isXMove: boolean
  score: Score
  gameRun: boolean


  constructor(score: Score) {
    this.score = score;
    this.cells = new CellsWrapper(document.querySelectorAll(`.${cellClass}`))
    this.isXMove = getRandomBoolean()
    this.gameRun = true
    this.addOnClickToCells()
  }

  reset() {
    this.isXMove = getRandomBoolean()
    this.gameRun = true
  }

  private async addOnClickToCells() {
    this.cells.asArray.forEach(cell => {
      cell.onClick(() => {
        if(this.gameRun)
          cell.getSign(this.isXMove, playerXMove, playerOMove).then(boolean => {
            this.isXMove = boolean
            this.checkWinStatus()
          })
      })
    })
  }

  private async checkWinStatus() {
    return await this.checkWinStatusHelp(playerXMove) ||
    await this.checkWinStatusHelp(playerOMove)
  }

  private async testCellsGenerator(playerNMove: playerNMove, generatorArray: number[][][]) {
    let whoWin = ''
    generatorArray.forEach(async value => {
      whoWin = await this.testCells(playerNMove, value)
    })
    return whoWin
  }

  private async testCells(playerNMove: playerNMove, [first, second, third]: number[][]) {
    if(
      this.cells.getCellFromField(first) == playerNMove && 
      this.cells.getCellFromField(second) == playerNMove &&
      this.cells.getCellFromField(third) == playerNMove    
    ) {
      this.cells.paintCell(first, second, third)
      this.gameRun = false
      this.score.addScoreAndInsert(playerNMove == playerXMove ? 'x' : 'o')
      return playerNMove
    }
    return ''
  }

  private async checkWinStatusHelp(playerNMove: playerNMove) {
    return this.testCellsGenerator(playerNMove, [
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

  
}

