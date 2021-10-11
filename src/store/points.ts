import { createSignal } from "solid-js";

export const [points, setPoints] = createSignal({
  x: 0,
  o: 0,
});

export const clearPoints = () => setPoints({ x: 0, o:0 })