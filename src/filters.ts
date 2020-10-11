import { combinations } from "./utils";

type Filter = String[];

export const PLATFORMS = [
  "Windows",
  "Linux",
  "Mac",
  "PS4",
  "PS3",
  "XBO",
  "Switch",
  "GamePass",
  "PSNow",
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
// XBOIncludes : [true]
// etc
// Which we can use as array to the include filter in the page query
// Here [true,false] acts as 'dont worry' about this value
export const inVariablesFromFilter = (filter: Filter) =>
  PLATFORMS.reduce((acc, platform) => {
    const filterValue = filter.includes(platform) ? [true] : [true, false];
    acc[`${platform}Includes`] = filterValue;
    return acc;
  }, {});

export const urlFromFilter = (filter: Filter) =>
  filter.map((f) => f.toLowerCase()).join("/");
