import { ReadLine } from "node:readline";

export default async function question(
  question: string,
  rl: ReadLine
): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => resolve(answer));
  });
}
