function matchChar(
  char: string,
  subchar: string,
  mappings: Map<string, string[]>,
): boolean {
  if (char === subchar) {
    return true;
  }

  return mappings.get(subchar)?.some((numMap) => numMap === char) ?? false;
}

function matchSubString(
  s: string,
  index: number,
  sub: string,
  mappings: Map<string, string[]>,
) {
  for (let it = index; it < index + sub.length; it++) {
    if (!matchChar(s.charAt(it), sub.charAt(it - index), mappings)) {
      return false;
    }
  }

  return true;
}

function matchReplacement(
  s: string,
  sub: string,
  mappings: string[][],
): boolean {
  const map = new Map<string, string[]>();
  mappings.forEach(([old, newchar]) => {
    if (map.has(old)) {
      map.get(old)?.push(newchar);
    } else {
      map.set(old, [newchar]);
    }
  });

  return s
    .split("")
    .some((_, startIndex) => matchSubString(s, startIndex, sub, map));
}

export { matchReplacement };
