export function _hideCursor(): string {
  return "\u001B[?25l";
}

export function _showCursor(): string {
  return "\u001B[?25h";
}
