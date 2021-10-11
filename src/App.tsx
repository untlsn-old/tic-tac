import { Component, For } from "solid-js";
import { check, clearGrid, clearPoints, grid, initEffects, points, setCurMove, setRun } from './store'



const App: Component = () => {
  initEffects();
  return (
    <div>
      <div class="score mt-5 ml-10">
        <p>X: {points().x}</p>
        <p>O: {points().o}</p>
      </div>
      <div class='flex flex-col items-center gap-5'>
        <div class='grid grid-cols-3 grid-rows-3 h-128 w-128'>
          <For each={grid()}>{(cell, index) => (
            <p class='border-2 cursor-pointer' onClick={() => check(index())}>
              {cell}
            </p>
          )}</For>
        </div>
        <div class="flex w-128 justify-evenly">
          <button onClick={() => {
            clearGrid();
            setCurMove('x');
            setRun(true)
          }}>Reset</button>
          <button onClick={clearPoints}>Reset score</button>
        </div>
      </div>
    </div>
  );
};

export default App;