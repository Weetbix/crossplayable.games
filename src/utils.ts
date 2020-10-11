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
