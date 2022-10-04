import { ReadLine } from "node:readline";

export async function _clearPrompt(rl: ReadLine) {
  rl.setPrompt("");
  rl.prompt();
}

export async function _render(prompt: string, rl: ReadLine) {
  rl.setPrompt(prompt);
  rl.prompt();
}
