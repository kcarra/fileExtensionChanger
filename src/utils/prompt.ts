const readline = require("node:readline");
const util = require("node:util");

type PromptStage = {
  fileFrom: string;
  fileTo: string;
  threading: string;
};

let fileExtensionFrom = "";
let fileExtensionTo = "";

function _hideCursor(): string {
  return "\u001B[?25l";
}

function _showCursor(): string {
  return "\u001B[?25h";
}

// Colors
const colors = {
  blue: "\u001b[34m",
  green: "\u001b[32m",
  reset: "\u001b[0m",
};

// Prompt stage
let promptStage: keyof PromptStage = "threading";

let option = 0;

function _clearPrompt() {
  rl.setPrompt("");
  rl.prompt();
}

function _render(prompt: string) {
  rl.setPrompt(prompt);
  rl.prompt();
}

function renderOptions(selection: number): string {
  const yes =
    selection === 0
      ? `${colors.green}> yes${colors.reset}`
      : `${colors.blue}  yes${colors.reset}`;
  const no =
    selection === 1
      ? `${colors.green}> no${colors.reset}`
      : `${colors.blue}  no${colors.reset}`;

  return `${colors.blue}Run in a worker thread pool?${
    colors.reset
  }\n${yes}\n${no}\n${_hideCursor()}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

async function question(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => resolve(answer));
  });
}

// On exit events show the cursor again
rl.on("SIGINT", () => {
  process.stdout.write(_showCursor());
  rl.close();
});

rl.on("close", () => {
  process.stdout.write(_showCursor());
});

const stage2KeyHandler: { [key: string]: () => void } = {
  down: () => {
    if (option !== 1) {
      option = 1;
      _clearPrompt();
      _render(renderOptions(1));
    }
  },
  up: () => {
    if (option !== 0) {
      option = 0;
      _clearPrompt();
      _render(renderOptions(0));
    }
  },
  return: () => {
    init.next();
  },
};

process.stdin.on("keypress", (c, k: { name: string }) => {
  const { name } = k;

  switch (promptStage) {
    case "threading":
      // do invoke stage2 keyhandler
      try {
        stage2KeyHandler[name]();
      } catch (error) {
        break;
      }
      break;
    default:
      break;
  }
});

async function fileFrom() {
  promptStage = "fileFrom";
  const answer = await question(
    `File extension ${colors.green}from${colors.reset} (press enter when done): `
  );
  fileExtensionFrom = answer.trim();
  // move to the next question
  init.next();
}

async function fileTo() {
  // promptStage = "fileTo";
  const answer = await question(
    `File extension ${colors.green}to${colors.reset} (press enter when done): `
  );
  fileExtensionTo = answer.trim();
}

function threading() {
  promptStage = "threading";
  _clearPrompt();
  _render(renderOptions(0));
}

async function* steps() {
  // yield threading();
  // yield await fileFrom();
  yield await fileTo();
  rl.close();
}

export const init = steps();
