const readline = require("node:readline");
const util = require("node:util");

// Async version of moveCursor
const moveCursor = util.promisify(readline.moveCursor);

export async function init() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "[ ] FooBar\n[ ] FooBaz",
  });

  rl.prompt(false);

  await moveCursor(process.stdin, 0, -1);

  process.stdin.on("keypress", async (c, k) => {
    const { name } = k;

    if (name === "down") {
      await moveCursor(process.stdin, 0, 1);
    }

    if (name === "up") {
      await moveCursor(process.stdin, 0, -1);
    }
  });

  rl.on("line", (line: string) => {
    switch (line.trim()) {
      case "hello":
        console.log("world!");
        break;
      default:
        console.log(`Say what? I might have heard '${line.trim()}'`);
        break;
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0);
  });
}
