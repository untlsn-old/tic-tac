import { createEffect, untrack } from "solid-js";
import { setPoints } from "./points";
import { grid, produceGrid } from "./grid";
import { curMove, switchCurMove } from "./move";
import { setRun } from "./run";

export const check = (index: number) => {
  produceGrid(state => {
    state[index] = curMove()
  })
  switchCurMove()
}

export const initEffects = () => {
  createEffect(() => {
    const move = untrack(curMove)
    const checkCells = (...cells: number[]) => cells.every(cell => grid()[cell] == move);

    const check = checkCells(0, 3, 6)
      || checkCells(0, 1, 2)
      || checkCells(0, 4, 8)
      || checkCells(1, 4, 7)
      || checkCells(2, 5, 8)
      || checkCells(2, 4, 6)
      || checkCells(3, 4, 5)
      || checkCells(6, 7, 8)

    if (check) {
      setRun(false);
      setPoints(({ ...points }) => {
        points[move]++;
        return points;
      })
    }
  })
}