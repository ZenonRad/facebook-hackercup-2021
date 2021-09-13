import * as fs from "fs";
import * as path from "path";

export const saveOutputs = (fileName: string, outputs: string[]) => {
  fs.writeFileSync(
    path.join(__dirname, `../outputs/${fileName}.txt`),
    outputs.join("\n")
  );
};
