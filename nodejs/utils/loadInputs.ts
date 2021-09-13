import * as fs from "fs";
import * as path from "path";

export const loadInputs = (fileName: string): (() => string | undefined) => {
  const lines = fs
    .readFileSync(path.join(__dirname, `../inputs/${fileName}.txt`))
    .toString()
    .split("\n");

  return () => lines.shift();
};
