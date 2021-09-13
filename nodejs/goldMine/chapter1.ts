import { withInOut } from "../utils";

type Matrix = number[][];
type NextCaveInfo = { cave: number; value: number; from?: number };

withInOut(
  "gold_mine_chapter_1_validation_input",
  "gold_mine_chapter_1_validation_output",
  ({ readLine }) => {
    const N = Number(readLine());
    console.log({ N });
    const caveOreWeigths = readLine()!.split(" ").map(Number);
    const matrix = readMatrix(N, readLine);
    return String(maximumGoldWeights(caveOreWeigths, matrix));
  }
);

export function readMatrix(
  N: number,
  readLine: () => string | undefined
): Matrix {
  const matrix: Matrix = Array(N)
    .fill(undefined)
    .map(() => Array(N).fill(0));

  for (let i = 0; i < N - 1; i++) {
    const [vertice1, vertice2] = readLine()!.split(" ").map(Number);
    matrix[vertice1 - 1][vertice2 - 1] = 1;
    matrix[vertice2 - 1][vertice1 - 1] = 1;
  }

  return matrix;
}

export function maximumGoldWeights(
  caveOreWeigths: number[],
  matrix: Matrix
): number {
  const numberOfCaves = matrix.length;

  if (numberOfCaves === 1) return caveOreWeigths[0];

  const extremes = getExtremesFromCave(1, caveOreWeigths, matrix);

  const sorted = extremes.sort((a, b) => b.value - a.value);

  return sorted[0].value + (sorted[1]?.value ?? 0) + caveOreWeigths[0];
}

function getExtremesFromCave(
  startCaveId: number,
  caveOreWeigths: number[],
  matrix: Matrix
): NextCaveInfo[] {
  const remainingCaves: NextCaveInfo[] = [
    { cave: startCaveId, value: 0 /* caveOreWeigths[0] */ },
  ];

  const extremes: NextCaveInfo[] = [];

  while (remainingCaves.length) {
    const currentCave = remainingCaves.shift();

    const nextCaves = getNextCaves(
      currentCave!.cave,
      currentCave!.value,
      caveOreWeigths,
      matrix,
      currentCave!.from
    );

    if (nextCaves.length) remainingCaves.push(...nextCaves);
    //@ts-ignore
    else extremes.push({ ...currentCave, from: startCaveId });
  }

  return extremes;
}

function getNextCaves(
  currentCave: number,
  currentValue: number,
  caveOreWeigths: number[],
  matrix: Matrix,
  exclude: number = -1
): NextCaveInfo[] {
  const nextCaves: NextCaveInfo[] = [];

  matrix[currentCave - 1].forEach((accessible, index) => {
    const cave = index + 1;
    if (accessible && cave !== exclude)
      nextCaves.push({
        cave,
        value: currentValue + caveOreWeigths[cave - 1]!,
        from: currentCave,
      });
  });

  return nextCaves;
}
