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

  async paintCell(... winPlaces: number[][]){
    winPlaces.forEach(([row, column]) => {
      this.cells[row*3 + column].classList.add('win-cell')
    })
  }
  async unPaintCells() {
    this.cells.forEach(value => {
      value.classList.remove('win-cell')
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
}