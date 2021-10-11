import { Cell } from './cell';
export 
class CellsWrapper {
  cells: Cell[]

  constructor(nodeListOfElements: NodeListOf<Element>) {
    this.cells = []
    nodeListOfElements.forEach(value => {
      this.cells.push(new Cell(value))
    })
  }

  async paintCell(type: string, ... winPlaces: number[][]){
    winPlaces.forEach(([row, column]) => {
      console.log(`row -> ${row}, column -> ${column}, type -> ${type}`)
      this.cells[row*3 + column].classList.add('win-cell', `win-cell--${type}`)
    })
  }
  async unPaintCells() {
    this.cells.forEach(cell => {
      cell.classList.remove('win-cell', 'win-cell--v', 'win-cell--h', 'win-cell--vh', 'win-cell--hv',)
    })
  }

  get cellsField() {
    return [
      [
        this.cells[0].data, this.cells[1].data, this.cells[2].data
      ],
      [
        this.cells[3].data, this.cells[4].data, this.cells[5].data
      ],
      [
        this.cells[6].data, this.cells[7].data, this.cells[8].data
      ]
    ]
  }

  get asArray() {
    return this.cells
  }

  getCellFromField([row, column]: number[]) {
    return this.cellsField[row][column]
  }

  testCells(playerNMove: string, first: number[], second: number[], third: number[]) {
      return this.getCellFromField(first) == playerNMove && 
      this.getCellFromField(second) == playerNMove &&
      this.getCellFromField(third) == playerNMove
  }
}

