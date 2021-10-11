import 'regenerator-runtime/runtime'
import { createGrid } from './grid';
import { Game } from './game'
import { Score } from './score';
import { scoreButtonsEvents } from './buttons';
import '../style/style.scss'

const bootstrap = async() => {
  createGrid()
  const score = new Score()
  score.insertScore()
  const game = new Game(score)
  scoreButtonsEvents(game)
}

bootstrap()