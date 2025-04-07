function solveLine(
  biGraph: Map<number, number[]>,
  connections: number[],
): number[][] {
  const start = connections.findIndex((con) => con === 1);
  const solution = [start];

  let prev = start;
  let next: number | undefined = biGraph.get(prev)?.[0];
  while (next !== undefined) {
    solution.push(next);
    const curr = next;
    next = biGraph.get(next)?.find((x) => x !== prev);
    prev = curr;
  }

  return [solution];
}

function solveGrid(
  biGraph: Map<number, number[]>,
  connections: number[],
): number[][] {
  const firstline = (): number[] => {
    // solve first line by doing dijkstra to find the shortest edge
    const start = connections.findIndex((con) => con === 2);
    const memo: Record<number, number> = {};
    memo[start] = -1;
    const stack = [start];
    let end: number | undefined;
    while (stack.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const cur = stack.shift()!;
      const adjNodes = biGraph.get(cur);
      if (adjNodes?.length === 2 && cur !== start) {
        end = cur;
        break;
      }
      adjNodes?.forEach((num) => {
        if (!(num in memo)) {
          stack.push(num);
          memo[num] = cur;
        }
      });
    }

    if (end === undefined) {
      throw new Error("could not find a second corner");
    }

    const solution = [];
    let prev: number | undefined = end;
    while (prev !== -1) {
      solution.push(prev);
      prev = memo[prev];
    }

    return solution;
  };

  const solution = [firstline()];

  // now solve line by line by finding the one digit that fits in the next position
  let curLineIndex = 0;

  while ((curLineIndex + 1) * solution[0].length !== biGraph.size) {
    const lineStart = biGraph
      .get(solution[curLineIndex][0])
      ?.find(
        (num) =>
          num !== solution[curLineIndex][1] &&
          num !== solution[curLineIndex - 1]?.[0],
      );

    if (lineStart === undefined) {
      throw new Error(
        "could not find the start of the next line while it should exist",
      );
    }

    solution.push([lineStart]);
    curLineIndex++;
    const curLine = solution[curLineIndex];

    let prev = lineStart;
    for (let index = 1; index < solution[0].length; index++) {
      const prevCons = biGraph.get(prev);
      const prevLineCons = biGraph.get(solution[curLineIndex - 1][index]);
      const next = prevCons?.find(
        (con) =>
          prevLineCons?.includes(con) &&
          solution[curLineIndex - 1][index - 1] !== con,
      );
      if (next === undefined) {
        throw new Error("Could not find the next digit while it should exist");
      }
      prev = next;
      curLine.push(next);
    }
  }

  return solution;
}

// this problem is poorly worded imo. It's not clear from the wording that the array is never sparse, but needs some assumptions.
function constructGridLayout(n: number, edges: number[][]): number[][] {
  const connections = new Array<number>(n).fill(0);
  const biGraph = new Map<number, number[]>();

  edges.forEach(([from, to]: number[]) => {
    connections[from]++;
    connections[to]++;

    const fromAdded = biGraph.get(from)?.push(to);
    if (!fromAdded) {
      biGraph.set(from, [to]);
    }

    const toAdded = biGraph.get(to)?.push(from);
    if (!toAdded) {
      biGraph.set(to, [from]);
    }
  });

  if (connections.some((con) => con === 1)) {
    return solveLine(biGraph, connections);
  }
  return solveGrid(biGraph, connections);
}

export { constructGridLayout };
