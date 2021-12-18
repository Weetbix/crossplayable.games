import { executeInChunks } from "./utils";

describe("executeInChunks", () => {
  it("should with 1 chunk, returning the exact input", async () => {
    const expected = [1, 2, 3, 4];
    const actual = await executeInChunks(1, [1, 2, 3, 4], (i) => [...i]);
    expect(actual).toEqual(expected);
  });

  it("should work with 1 chunk, modifying the input", async () => {
    const expected = [2, 4, 6, 8];
    const actual = await executeInChunks(1, [1, 2, 3, 4], (i) => [i * 2]);
    expect(actual).toEqual(expected);
  });

  it("should chunk correctly when chuck is evenly divisible", async () => {
    const expected = [1, 2, 3, 4];
    const functorSpy = jest.fn((chunk) => [...chunk]);
    const actual = await executeInChunks(2, [1, 2, 3, 4], functorSpy);
    expect(functorSpy).toHaveBeenCalledTimes(2);
    expect(functorSpy.mock.calls[0][0]).toEqual([1,2]);
    expect(functorSpy.mock.calls[1][0]).toEqual([3,4]);
    expect(actual).toEqual(expected);
  });

  it("should chunk correctly when chunk is not evenly divisible", async () => {
    const expected = [1, 2, 3, 4];
    const functorSpy = jest.fn((chunk) => [...chunk]);
    const actual = await executeInChunks(3, [1, 2, 3, 4], functorSpy);
    expect(functorSpy).toHaveBeenCalledTimes(2);
    expect(functorSpy.mock.calls[0][0]).toEqual([1,2,3]);
    expect(functorSpy.mock.calls[1][0]).toEqual([4]);
    expect(actual).toEqual(expected);
  });

  it("should chunk correctly when chunk is offset and equal to full size", async () => {
    const expected = [1, 2, 3, 4];
    const functorSpy = jest.fn((chunk) => [...chunk]);
    const actual = await executeInChunks(4, [1, 2, 3, 4], functorSpy);
    expect(functorSpy).toHaveBeenCalledTimes(1);
    expect(functorSpy.mock.calls[0][0]).toEqual([1,2,3,4]);
    expect(actual).toEqual(expected);
  });
});
