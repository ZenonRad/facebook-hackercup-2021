import { loadInputs, saveOutputs } from ".";

export const withInOut = (
  inputFileName: string,
  outputFileName: string,
  callback: (args: {
    T: number;
    i: number;
    readLine: () => string | undefined;
  }) => string
) => {
  const readLine = loadInputs(inputFileName);

  const T = Number(readLine());
  const outputs: string[] = [];

  for (let i = 0; i < T; i++) {
    outputs.push(`Case #${i + 1}: ${callback({ T, i, readLine })}`);
  }

  saveOutputs(outputFileName, outputs);
};
