const readline = require("node:readline");
const util = require("node:util");

type PromptStage = {
  stage1: string;
  stage2: string;
};

let fileExtensionFrom = "";
let fileExtensionTo = "";

function _underline(word: string): string {
  return `"\e[3m ${word} \e[23m"`;
}

// Colors
const colors = {
  blue: "\u001b[34m",
  green: "\u001b[32m",
  reset: "\u001b[0m",
};

// Prompt stage
let promptStage: keyof PromptStage = "stage1";

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

  return `${colors.blue}Run in a worker thread pool?${colors.reset}\n${yes}\n${no}\n\u001B[?25l`;
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

// Initial prompt message, comment for now
// rl.prompt();

rl.on("SIGINT", () => {
  rl.close();
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
    console.log(option);
    rl.close();
  },
};

const stage1KeyHandler: { [key: string]: () => void } = {
  return: () => {},
};

process.stdin.on("keypress", (c, k: { name: string }) => {
  const { name } = k;

  switch (promptStage) {
    case "stage1":
      // do invoke stage1 keyhandler
      try {
        stage1KeyHandler[name]();
      } catch (error) {
        break;
      }
      break;
    case "stage2":
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
  const answer = await question(
    `File extension ${colors.green}from${colors.reset} (press enter when done): `
  );

  fileExtensionFrom = answer.trim();

  // move to the next question
  init.next();
}

async function fileTo() {
  const answer = await question(
    `File extension ${colors.green}to${colors.reset} (press enter when done): `
  );

  fileExtensionTo = answer.trim();

  // move to the next question
  init.next();
}

function threading() {
  promptStage = "stage2";
  _clearPrompt();
  _render(renderOptions(0));
}

async function* steps() {
  yield await fileFrom();
  yield await fileTo();
  yield threading();
}

export const init = steps();
