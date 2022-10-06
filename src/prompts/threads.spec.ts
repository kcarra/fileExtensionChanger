import { threads } from "./threads.prompt";
import { ReadLine } from "node:readline";

const readline = require("node:readline");

describe("threads", () => {
  jest.spyOn(readline, "createInterface").mockImplementation(() => {
    return {
      question: (question: string, cb: (answer: string) => string) => {
        return cb("foo bar");
      },
    };
  });

  const rl: ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  test("it prompts for a question and returns the answer", async () => {
    expect.assertions(1);
    await expect(threads(rl)).resolves.toBe("foo bar");
  });
});
