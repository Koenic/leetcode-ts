export const pascalsTriangleLineMod10 = (n: number): number[] => {
  const line: number[] = [1];
  let prev = 1n;
  const bign = BigInt(n);
  for (let i = 0n; i < (n - 1) / 2; i++) {
    prev = (prev * (bign - i)) / (i + 1n);
    line.push(Number(prev % 10n));
  }

  for (let i = line.length + (n % 2) - 2; i >= 0; i--) {
    line.push(line[i]);
  }
  return line;
};

// this solution is too slow for leetcode. I would need to research more on how I could create a large pascal triangle without resorting to bigint to make it faster.
export function hasSameDigits(s: string): boolean {
  const sIntArray: number[] = [];
  for (let i = 0; i < s.length; i++) {
    sIntArray.push(s.charCodeAt(i) - "0".charCodeAt(0));
  }

  const pascalLine = pascalsTriangleLineMod10(s.length - 2);

  let first = 0;
  let second = 0;
  pascalLine.forEach((num, ind) => {
    first += num * sIntArray[ind];
    second += num * sIntArray[ind + 1];
  });

  return first % 10 === second % 10;
}
