export function capitalizeString(input: string): string {
  let s: string = "";
  let t = input.split("_");
  s += t[0].replace(
    /^(.)(.*)$/,
    (_, firstChar, restOfString) =>
      firstChar.toUpperCase() + restOfString.toLowerCase()
  );
  if (t.length > 1) {
    s += t[1].replace(
      /^(.)(.*)$/,
      (_, firstChar, restOfString) =>
        firstChar.toUpperCase() + restOfString.toLowerCase()
    );
  }

  return s;
}
export function extractNumbersFromString(inputString: string): number[] {
  const numberRegex = /\d+/g;
  const numbers: number[] = [];
  let match;

  while ((match = numberRegex.exec(inputString)) !== null) {
    numbers.push(Number(match[0]));
  }

  return numbers;
}
export function getRandomWord(words: any[]): string {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function numberFormat(
  value: number | string,
  locale: string = "en"
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
}
