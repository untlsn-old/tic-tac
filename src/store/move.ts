import { createSignal } from "solid-js";

export const [curMove, setCurMove] = createSignal<'x' | 'o' | string>('x')

export const switchCurMove = () => setCurMove(v => v == 'x' ? 'o' : 'x')
