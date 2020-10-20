export
class Cell {
  root: Element

  constructor(cell: Element) {
    this.root = cell
  }

  get data() {
    return this.root.innerHTML
  }
  set data(field) {
    this.root.innerHTML = field
  }
  get classList() {
    return this.root.classList
  }

  async onClick(event: () => void) {
    this.root.addEventListener('click', event)
  }

  async getSign(isXMove: boolean, playerXMove: string, playerOMove: string) {
    if(this.data == ''){
      this.data = isXMove ? playerXMove : playerOMove
      return !isXMove
    }
    return isXMove
  }
}