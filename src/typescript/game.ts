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

  // @ts-ignore
  private async addOnClickToCells() {
    this.cells.asArray.forEach(cell => {
      cell.onClick(() => {
        if(this.booleanField.gameRun)
          cell.getSign(this.booleanField.isXMove, this.playerMove.X, this.playerMove.O).then(() => {
            this.booleanField.changePlayer()
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
    this.playerMove.doOnBoth(player => {
      this.checkWinStatusHelp(player)
    })
  }

  private async checkWinStatusHelp(playerNMove: string) {
    return this.testCellsGenerator(playerNMove, [
      [[0, 0], [1, 0], [2, 0], 'v'],
      [[0, 1], [1, 1], [2, 1], 'v'],
      [[0, 2], [1, 2], [2, 2], 'v'],
      [[0, 0], [0, 1], [0, 2], 'h'],
      [[1, 0], [1, 1], [1, 2], 'h'],
      [[2, 0], [2, 1], [2, 2], 'h'],
      [[0, 0], [1, 1], [2, 2], 'hv'],
      [[0, 2], [1, 1], [2, 0], 'vh']
    ])
  }
  private async testCellsGenerator(playerNMove: string, generatorArray: statusType[]) {
    generatorArray.forEach(value  => {
      this.testCells(playerNMove, value)
    })
  }
  private async testCells(playerNMove: string, [first, second, third, type]: statusType) {
    if(this.cells.testCells(playerNMove, first, second, third)) {
      this.cells.paintCell( type, first, second, third)
      this.booleanField.endGame()
      this.score.addScoreAndInsert(this.playerMove.whoIs(playerNMove))
    }
  }
  
}

type statusType = [number[], number[], number[], string]