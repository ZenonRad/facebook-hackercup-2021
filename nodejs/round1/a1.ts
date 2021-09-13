import { withInOut } from "../utils";

withInOut(
  "weak_typing_chapter_1_validation_input",
  "weak_typing_chapter_1_validation_ouput",
  ({ readLine }) => {
    const N = Number(readLine());
    const ex = readLine()!;
    let nbSwitch = 0;

    let ld: string | undefined = undefined;

    for (let i = 0; i < N; i++) {
      const c = ex[i];

      if (c === "X" || c === "O") {
        if (ld === undefined) ld = c;
        else if (ld !== c) {
          nbSwitch++;
          ld = c;
        }
      }
    }

    return String(nbSwitch);
  }
);
