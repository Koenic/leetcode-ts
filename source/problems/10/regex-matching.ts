let state = new Map<string, boolean>();
function match(s: string, index: number, p: string, pIndex: number): boolean {
  const val = state.get(JSON.stringify([index, pIndex]));
  if (val !== undefined) {
    return val;
  }
  if (s.length === index && p.length === pIndex) {
    state.set(JSON.stringify([index, pIndex]), true);
    return true;
  }

  if (s.length < index || p.length < pIndex) {
    state.set(JSON.stringify([index, pIndex]), false);
    return false;
  }

  if (
    s.length > index &&
    p.length > pIndex &&
    (p.charAt(pIndex) === s.charAt(index) || p.charAt(pIndex) === ".") &&
    match(s, index + 1, p, pIndex + 1)
  ) {
    state.set(JSON.stringify([index, pIndex]), true);
    return true;
  }

  if (
    p.length > pIndex + 1 &&
    p.charAt(pIndex + 1) === "*" &&
    match(s, index, p, pIndex + 2)
  ) {
    state.set(JSON.stringify([index, pIndex]), true);
    return true;
  }

  if (
    p.length > pIndex + 1 &&
    s.length > index &&
    p.charAt(pIndex + 1) === "*" &&
    (p.charAt(pIndex) === "." || p.charAt(pIndex) === s.charAt(index)) &&
    (match(s, index + 1, p, pIndex) || match(s, index + 1, p, pIndex + 2))
  ) {
    state.set(JSON.stringify([index, pIndex]), true);
    return true;
  }

  state.set(JSON.stringify([index, pIndex]), false);
  return false;
}

function isMatch(s: string, p: string): boolean {
  state = new Map<string, boolean>();
  return match(s, 0, p, 0);
}

export { isMatch };
