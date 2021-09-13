import { loadInputs, saveOutputs } from "./utils";

enum Cell {
  EMPTY = ".",
  X = "X",
  O = "O",
}

const main = async () => {
  const readInput = loadInputs("xs_and_os_validation_input");

  const numberOfCases: number = Number(readInput());
  const outputs: string[] = [];

  for (let i = 0; i < numberOfCases; i++) {
    const N = Number(readInput());

    const grid: string[] = Array(N)
      .fill(undefined)
      .map(() => readInput()!);

    const [minNumberOfAdditionalXs, numberOfDifferentSets] = xsAndOs(grid);

    outputs.push(
      `Case #${i + 1}: ${
        minNumberOfAdditionalXs === -1
          ? "Impossible"
          : `${minNumberOfAdditionalXs} ${numberOfDifferentSets}`
      }`
    );
  }

  saveOutputs("xs_and_os_validation_output", outputs);
};

main();

function xsAndOs(grid: string[]): [number, number] {
  const candidates: string[][] = [];

  // For each rows
  grid.forEach((row, i) => {
    if (row.match(Cell.O)) return;

    const emptyCellIds: string[] = [];

    row.split("").forEach((cell, j) => {
      if (cell === Cell.EMPTY) {
        emptyCellIds.push(toCellId(i, j));
      }
    });

    candidates.push(emptyCellIds); // Add the list of empty cell ids
  });

  // For each columns
  for (let j = 0; j < grid.length; j++) {
    let isCandidate = true;
    const cells: string[] = [];

    for (let i = 0; i < grid.length && isCandidate; i++) {
      const cell = grid[i][j];
      cells.push(cell);
      if (cell === Cell.O) isCandidate = false;
    }

    if (!isCandidate) continue;

    const emptyCellIds: string[] = [];

    cells.forEach((cell, i) => {
      if (cell === Cell.EMPTY) {
        emptyCellIds.push(toCellId(i, j));
      }
    });

    candidates.push(emptyCellIds);
  }

  const minNumberOfAdditionalXs = candidates.length
    ? Math.min(...candidates.map((candidate) => candidate.length))
    : -1;

  const numberOfDifferentSets = candidates.length
    ? getNumberOfDifferentSets(candidates, minNumberOfAdditionalXs)
    : -1;

  return [minNumberOfAdditionalXs, numberOfDifferentSets];
}

function getNumberOfDifferentSets(
  candidates: string[][],
  minNumberOfAdditionalXs: number
): number {
  const xMinimumNumberCandidates = candidates.filter(
    (candidate) => candidate.length === minNumberOfAdditionalXs
  );

  if (minNumberOfAdditionalXs === 0) return 0; // You never know

  if (minNumberOfAdditionalXs === 1)
    return new Set(xMinimumNumberCandidates.map((candidate) => candidate[0]))
      .size;

  return xMinimumNumberCandidates.length;
}

function toCellId(i: number, j: number): string {
  const zeroPad = (n: number) => String(n).padStart(2, "0");
  return `${zeroPad(i)}${zeroPad(j)}`;
}

function toCoordinates(cellId: string): [number, number] {
  return [Number(cellId.slice(0, 2)), Number(cellId.slice(2))];
}
