import question from "../utils/question";
import { ReadLine } from "node:readline";
import colors from "../utils/colors";

export async function threads(rl: ReadLine): Promise<string> {
  return await question(
    `Number of threads (enter a number then press enter when done): `,
    rl
  );
}
