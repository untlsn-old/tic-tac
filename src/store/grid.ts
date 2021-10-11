import { createSignal } from "solid-js";
import produce from "immer";
import { run } from "./run";

const init = [
  '', '', '',
  '', '', '',
  '', '', '',
]

export const [grid, setGrid] = createSignal(init)

export const produceGrid = (recipe: (state: string[]) => void) => run() && setGrid(v => produce(v, recipe))

export const clearGrid = () => setGrid(init)

















