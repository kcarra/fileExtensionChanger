import { renderOptions } from "./options.prompt";
import * as cursors from "../utils/cursor";

describe("options prompt", () => {
  const cursorSpy = jest.spyOn(cursors, "_hideCursor");

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("prompts the user with a set of options defaulted to yes", () => {
    const expected = renderOptions(0);
    expect(renderOptions(0)).toMatch(expected);
    expect(cursorSpy).toHaveBeenCalledTimes(2);
  });

  it("prompts the user with a set of options defaulted to yes", () => {
    const expected = renderOptions(1);
    expect(renderOptions(1)).toMatch(expected);
    expect(cursorSpy).toHaveBeenCalledTimes(2);
  });
});
