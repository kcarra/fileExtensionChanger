import { _clearPrompt, _render } from "./render";
import { ReadLine } from "node:readline";

const readline = require("node:readline");

describe("render utils", () => {
  const setPromptSpy = jest.fn((val) => val);
  const promptSpy = jest.fn();

  jest.spyOn(readline, "createInterface").mockImplementation(() => {
    return {
      setPrompt: setPromptSpy,
      prompt: promptSpy,
    };
  });

  const rl: ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("sets the current rl prompt with a value", () => {
    _render("hello world", rl);
    expect(setPromptSpy).toHaveBeenCalledWith("hello world");
    expect(promptSpy).toHaveBeenCalledTimes(1);
  });

  it("clears the current rl prompt", () => {
    _clearPrompt(rl);
    expect(setPromptSpy).toHaveBeenCalledWith("");
    expect(promptSpy).toHaveBeenCalledTimes(1);
  });
});
