import { Score } from './score';
import { CellsWrapper } from './cells-wrapper';
import { BooleanField } from './boolean-field';
import { PlayerMove } from './player-move';

export 
class Game {
  cells: CellsWrapper
  score: Score
  booleanField: BooleanField
  playerMove: PlayerMove

  constructor(score: Score) {
    this.score = score;
    this.cells = new CellsWrapper(document.querySelectorAll(`.js-cell`))
    this.booleanField = new BooleanField()
    this.playerMove = new PlayerMove('x', 'o')
    this.addOnClickToCells()
  }

  private async addOnClickToCells() {
    this.cells.asArray.forEach(cell => {
      cell.onClick(() => {
        if(this.booleanField.gameRun)
          cell.getSign(this.booleanField.isXMove, this.playerMove.X, this.playerMove.O).then(boolean => {
            this.booleanField.isXMove = boolean
            this.checkWinStatus()
          })
      })
    })
  }
  reset() {
    this.booleanField = new BooleanField()
    this.cells.unPaintCells()
  }

  private async checkWinStatus() {
    return await this.checkWinStatusHelp(this.playerMove.X) ||
    await this.checkWinStatusHelp(this.playerMove.O)
  }

  private async checkWinStatusHelp(playerNMove: string) {
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
  private async testCellsGenerator(playerNMove: string, generatorArray: number[][][]) {
    let whoWin = ''
    generatorArray.forEach(async value => {
      this.testCells(playerNMove, value).then(value => {
        whoWin = whoWin
      })
    })
    return whoWin
  }
  private async testCells(playerNMove: string, [first, second, third]: number[][]) {
    if(
      this.cells.testCells(playerNMove, first, second, third)   
    ) {
      this.cells.paintCell(first, second, third)
      this.booleanField.endGame()
      const who = this.playerMove.whoIs(playerNMove)
      this.score.addScoreAndInsert(who)
      return who
    }
  }
  
}

