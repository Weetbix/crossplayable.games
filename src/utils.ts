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

// Take a large array and apply some async operation on
// smaller chunks, merging and returning all the results
export async function executeInChunks<T, R>(
  chunkLength: number,
  items: Array<T>,
  operation: (i: Array<T>) => Promise<Array<R>>
) {
  let chunks = chunk(items, chunkLength);
  let results: R[] = [];
  for (let i = 0; i < chunks.length; i++) {
    results = [...results, ...(await operation(chunks[i]))];
  }
  return results;
}

// Returns all unique combinations of an array
// Modified from https://stackoverflow.com/a/47147597
export const combinations = <T>(array: T[]): T[][] =>
  array.reduce(
    (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
    [[]]
  );
