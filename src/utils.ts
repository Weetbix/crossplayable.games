// Split an input array into chunks of chunkLength length
export function chunk<T>(
  array: Array<T>,
  chunkLength: number
): Array<Array<T>> {
  const chunks: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i += chunkLength) {
    chunks.push(array.slice(i, i + chunkLength));
  }
  return chunks;
}

// Returns all unique combinations of an array
// Modified from https://stackoverflow.com/a/47147597
export const combinations = <T>(array: T[]): T[][] =>
  array
    .reduce(
      (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
      [[]]
    )
    .filter((set) => set.length);
