const { exec, spawn } = require("node:child_process");
const path = require("node:path");
const util = require("node:util");

const asyncExec = util.promisify(exec);

describe("prompt", () => {
  test("it prompts the user", async () => {
    const bin = "bin/bin.js";
    const executablePath = `${path.resolve(process.cwd(), bin)}`;
    // exec the bin.js file
    // const { error, stdout, stderr } = await asyncExec(`node ${executablePath}`);
    // console.log(stdout);
    // expect(stdout).toMatch("Hello world");

    const fec = spawn(`node ${executablePath}`);
  });
});
