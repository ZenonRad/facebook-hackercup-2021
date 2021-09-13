import { withInOut } from "../utils";

type Matrix = number[][];
type NextCaveInfo = { cave: number; value: number; from?: number };

withInOut(
  "gold_mine_chapter_2_validation_input",
  "gold_mine_chapter_2_validation_output",
  ({ readLine }) => {
    const [N, K] = readLine()!.split(" ").map(Number);
    const caveOreWeigths = readLine()!.split(" ").map(Number);
    const matrix = readMatrix(N - 1, readLine);
    return String(maximumGoldWeights(caveOreWeigths, matrix, K));
  }
);

export function maximumGoldWeights(
  caveOreWeigths: number[],
  matrix: Matrix,
  K: number
): number {
  let totalGoldWeight = 0;
  let leftTunnelsToDrill = K;

  return 0;
}

function getExternalExtremes(
  caveOreWeigths: number[],
  matrix: Matrix,
  excludes: number[]
): NextCaveInfo[] {
  const extremeCaves = findExtremes(matrix);

  const externalExtremeCaves = extremeCaves.filter(
    (cave) => !excludes.includes(cave)
  );

  const externalExtremes: NextCaveInfo[] = [];

  externalExtremeCaves.forEach((externalExtremeCave) => {
    externalExtremes.push(
      ...getExtremesFromCave(externalExtremeCave, caveOreWeigths, matrix)
    );
  });

  return externalExtremes;
}

function getExtremesFromCave(
  startCaveId: number,
  caveOreWeigths: number[],
  matrix: Matrix
): NextCaveInfo[] {
  const remainingCaves: NextCaveInfo[] = [
    { cave: startCaveId, value: caveOreWeigths[0] },
  ];

  const extremes: NextCaveInfo[] = [];

  while (remainingCaves.length) {
    const currentCave = remainingCaves.shift();

    const nextCaves = getNextCaves(
      currentCave.cave,
      currentCave.value,
      caveOreWeigths,
      matrix,
      currentCave.from
    );

    if (nextCaves.length) remainingCaves.push(...nextCaves);
    else extremes.push({ ...currentCave, from: startCaveId });
  }

  return extremes;
}

function goToMaximumLinkedToFirst() {}

function f(
  currentCave: number,
  power: number,
  caveOreWeigths: number[],
  matrix: Matrix
) {
  if (currentCave === 1) {
    if (power === 0) {
      // Do nothing
    } else {
      const extremesLinkedToFirst: NextCaveInfo[] = getExtremesFromCave(
        1,
        caveOreWeigths,
        matrix
      );

      if (extremesLinkedToFirst.length) {
        // Go to maximum next extreme
      } else {
        const externalExtremes: NextCaveInfo[] = getExternalExtremes(
          caveOreWeigths,
          matrix,
          extremesLinkedToFirst.map((info) => info.cave)
        );

        if (power > 1 && externalExtremes.length) {
          // Jump to maximum external extreme
        } else {
          // Do nothing
        }
      }
    }
  } else {
    // An isolated extreme
    const extremesLinkedToFirst: NextCaveInfo[] = getExtremesFromCave(
      1,
      caveOreWeigths,
      matrix
    );

    const externalExtremes: NextCaveInfo[] = getExternalExtremes(
      caveOreWeigths,
      matrix,
      extremesLinkedToFirst.map((info) => info.cave)
    );

    if (power === 1 || !externalExtremes.length) {
      // Jump to first cave
    } else if (!extremesLinkedToFirst.length) {
      // Jump to maximum external extreme
    } else {
      const maxExtremeMinusOneLinkedToFirst = 0;
      const maxExternalExtreme = 0;
      if (maxExtremeMinusOneLinkedToFirst > maxExternalExtreme) {
        // Jump to first cave
      } else {
        // Jump to maximum external extreme
      }
    }
  }
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

function findExtremes(matrix: Matrix): number[] {
  const extremes: number[] = [];

  matrix.forEach((row, index) => {
    if (sum(row) === 1) extremes.push(index + 1);
  });

  return extremes;
}

export function readMatrix(
  numberOfEdges: number,
  readLine: () => string | undefined
): Matrix {
  const matrix: Matrix = Array(numberOfEdges)
    .fill(undefined)
    .map(() => Array(numberOfEdges).fill(0));

  for (let i = 0; i < numberOfEdges; i++) {
    const [vertice1, vertice2] = readLine()!.split(" ").map(Number);
    matrix[vertice1 - 1][vertice2 - 1] = 1;
    matrix[vertice2 - 1][vertice1 - 1] = 1;
  }

  return matrix;
}

function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}
