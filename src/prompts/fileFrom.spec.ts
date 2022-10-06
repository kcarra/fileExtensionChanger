import { fileFrom } from "./fileFrom.prompt";
import { ReadLine } from "node:readline";

const readline = require("node:readline");

describe("fileFrom", () => {
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
    await expect(fileFrom(rl)).resolves.toBe("foo bar");
  });
});
