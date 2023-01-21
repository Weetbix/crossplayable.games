import { combinations } from "./utils";

type Filter = String[];

export const PLATFORMS = [
  "Windows",
  "Linux",
  "Mac",
  "PS5",
  "PS4",
  "PS3",
  "Xbox",
  "Switch",
  "GamePass",
  "PlaystationPlus",
];

// Generate unique combinations, so we can statically generate
// a page for every possible filter combinations
export const allFilters = combinations(PLATFORMS);

// We cannot dynamically change the query string, so we need a
// clever way to be able to do things like:
// { filter : { Switch: true } }
//
// We want to generate variables that look like this:
// LinuxIncludes : [true, false]
// XboxIncludes : [true]
// etc
// Which we can use as array to the include filter in the page query
// Here [true,false] acts as 'dont worry' about this value
export const inVariablesFromFilter = (filter: Filter) =>
  PLATFORMS.reduce((acc, platform) => {
    const filterValue = filter.includes(platform) ? [true] : [true, false];
    acc[`${platform}Includes`] = filterValue;
    return acc;
  }, {});

// The target does not neccesarily match one from our filter list, as the order
// or permutations could be different. So now we must match against that.
export const findFilter = (target: Filter): Filter =>
  allFilters.find(
    (filter) =>
      filter.length === target.length &&
      filter.every((platform) =>
        target.map((t) => t.toLowerCase()).includes(platform.toLowerCase())
      )
  );

export const filterFromUrl = (url: string): Filter =>
  findFilter(url.split("/").filter((platform) => platform.length));

export const urlFromFilter = (filter: Filter) =>
  "/" + filter.map((f) => f.toLowerCase()).join("/");

// Returns a new filter, with our without the platform value depending on
// if that platform was already included.
export const togglePlatform = (filter: Filter, platform: string): Filter => {
  // Create the target
  const target = filter.includes(platform)
    ? filter.filter((f) => f !== platform)
    : [...filter, platform];

  return findFilter(target);
};
