import colors from "../utils/colors";
import { _hideCursor } from "../utils/cursor";

export function renderOptions(selection: number): string {
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
