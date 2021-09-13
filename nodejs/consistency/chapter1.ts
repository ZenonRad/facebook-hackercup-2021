import { loadInputs, saveOutputs } from "../utils";

const vowelsRegex = /[AEIOU]/g;

const main = async () => {
  const readInput = loadInputs("consistency_chapter_1_validation_input");

  const birthDayNumber: number = Number(readInput());
  const outputs: string[] = [];

  for (let i = 0; i < birthDayNumber; i++) {
    const birthString = readInput()!.toLocaleUpperCase();
    const vowelsLength = countVowels(birthString);
    const consonantsLength = birthString.length - vowelsLength;

    const minSeconds = minNumberOfSeconds(
      birthString,
      vowelsLength,
      consonantsLength
    );

    outputs.push(`Case #${i + 1}: ${minSeconds}`);
  }

  saveOutputs("consistency_chapter_1_validation_output", outputs);
};

main();

function minNumberOfSeconds(
  birthString: string,
  vowelsLength: number,
  consonantsLength: number
) {
  const setOfCharacters = new Set(birthString);

  if (setOfCharacters.size < 2) return 0;

  if (vowelsLength === 0) return consonantsLength;
  if (consonantsLength === 0) return vowelsLength;

  return Math.min(
    ...[...setOfCharacters].map((character) =>
      numberOfSeconds(character, birthString, vowelsLength, consonantsLength)
    )
  );
}

function numberOfSeconds(
  targetCharacter: string,
  birthString: string,
  vowelsLength: number,
  consonantsLength: number
): number {
  if (isVowel(targetCharacter))
    return (
      consonantsLength +
      2 * (vowelsLength - numberOfOccurances(targetCharacter, birthString))
    );
  return (
    vowelsLength +
    2 * (consonantsLength - numberOfOccurances(targetCharacter, birthString))
  );
}

function isVowel(character: string): boolean {
  return Boolean(character.match(vowelsRegex));
}

function countVowels(str: string): number {
  const m = str.match(vowelsRegex);
  return m === null ? 0 : m.length;
}

function numberOfOccurances(character: string, str: string): number {
  const m = str.match(new RegExp(character, "g"));
  return m?.length ?? 0;
}
