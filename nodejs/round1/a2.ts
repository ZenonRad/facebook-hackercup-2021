import { withInOut } from "../utils";

withInOut(
  "weak_typing_chapter_2_validation_input",
  "weak_typing_chapter_2_validation_ouput",
  ({ readLine }) => {
    const N = Number(readLine());
    const ex = readLine()!;
    let s = 0;

    for (let i = 0; i < N - 1; i++) {
      const sub = ex.substring(i);
      const v = sumSwitchNumber(sub);

      s += v;
    }

    return String(s % 1000000007);
  }
);

function sumSwitchNumber(str: string): number {
  let s = 0;
  let ns = 0;
  let ls: string | undefined = undefined;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (c === "X" || c === "O") {
      if (ls !== undefined && ls !== c) {
        ns++;
      }

      ls = c;
    }

    s += ns;
  }

  return s;
}
