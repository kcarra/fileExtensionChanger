import question from "../utils/question";
import { ReadLine } from "node:readline";
import colors from "../utils/colors";

export async function fileFrom(rl: ReadLine): Promise<string> {
  const answer = await question(
    `File extension ${colors.green}from${colors.reset} (press enter when done): `,
    rl
  );
  return answer;
}
