import question from "../utils/question";
import { ReadLine } from "node:readline";
import colors from "../utils/colors";

export async function fileTo(rl: ReadLine): Promise<string> {
  return await question(
    `File extension ${colors.green}to${colors.reset} (press enter when done): `,
    rl
  );
}
