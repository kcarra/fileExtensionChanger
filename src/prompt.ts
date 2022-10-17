import readline from "node:readline";
import { _showCursor, _hideCursor } from "./utils/cursor";
import { _render, _clearPrompt } from "./utils/render";
import { renderOptions } from "./prompts/options.prompt";
import { threads } from "./prompts/threads.prompt";
import { fileFrom } from "./prompts/fileFrom.prompt";
import { fileTo } from "./prompts/fileTo.prompt";

export type PromptStage = {
  fileFrom: string;
  fileTo: string;
  threading: string;
};

export type PromptState = {
  isThreaded: boolean;
  numThreads: number;
  fileExtensionFrom: string;
  fileExtensionTo: string;
  promptStage: keyof PromptStage;
  files: Array<string>;
};

let state: PromptState = {
  isThreaded: true,
  numThreads: 0,
  fileExtensionFrom: "",
  fileExtensionTo: "",
  promptStage: "threading",
  files: [],
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

// This is just a quick and dirty solution for now
const updateState = (changes: Partial<PromptState>) => {
  state = { ...state, ...changes };
};

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
    if (state.isThreaded) {
      state.isThreaded = false;
      updateState({ isThreaded: false });
      _clearPrompt(rl);
      _render(renderOptions(1), rl);
    }
  },
  up: () => {
    if (!state.isThreaded) {
      updateState({ isThreaded: true });
      _clearPrompt(rl);
      _render(renderOptions(0), rl);
    }
  },
  return: () => {
    init.next();
  },
};

process.stdin.on("keypress", (c, k: { name: string }) => {
  const { name } = k;

  switch (state.promptStage) {
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

function threading() {
  state.promptStage = "threading";
  _clearPrompt(rl);
  _render(renderOptions(0), rl);
}

async function numThreads(state: PromptState): Promise<string | undefined> {
  state.promptStage = "threading";
  if (state.isThreaded) {
    const answer = await threads(rl);
    const count = Number.parseInt(answer);

    if (isNaN(count)) {
      // TODO: this should give some meaningful error message, clear the previous line, prompt user to try again
      return await numThreads(state);
    }
    // TODO: Set limits on num of threads based on users OS limitations
    updateState({ numThreads: count });
  }
  init.next();
}

async function fileFromQuestion(state: PromptState) {
  state.promptStage = "fileFrom";
  const fileExtensionFrom = await fileFrom(rl);
  updateState({ fileExtensionFrom });
  init.next();
}

async function fileToQuestion(state: PromptState) {
  state.promptStage = "fileTo";
  const fileExtensionTo = await fileTo(rl);
  updateState({ fileExtensionTo });
  init.next();
}

async function* steps() {
  yield threading();
  yield await numThreads(state);
  yield await fileFromQuestion(state);
  yield await fileToQuestion(state);
  yield await rl.close();
}

export const init = steps();
