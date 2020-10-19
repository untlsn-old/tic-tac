import { clearGrid } from './grid';
import { Game } from './game';

export
const scoreButtonsEvents = async(game: Game) => {
  document.querySelector('.js-reset').addEventListener('click', () => { 
    clearGrid() 
    game.reset()
  })
  document.querySelector('.js-reset-score').addEventListener('click', () => { 
    game.score.clearScoreAndInsert() 
  })
}