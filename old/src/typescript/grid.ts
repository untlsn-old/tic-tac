export
const createGrid = async() => {
  const game = document.querySelector('.js-game')!
  for(let i = 0; i < 9; i++) {
    game.innerHTML += '<div class="game__cell js-cell">'
  }
}

export
const clearGrid = async() => {
  document.querySelectorAll(`.js-cell`).forEach(cell => cell.innerHTML = '')
}