import React from "react";
import { graphql } from "gatsby";

const FilterPage = (props: any) => {
  console.log(props);
  return <span>here</span>;
};
export default FilterPage;

export const query = graphql`
  query FilterPage(
    $GamePassIncludes: [Boolean]
    $LinuxIncludes: [Boolean]
    $MacIncludes: [Boolean]
    $PS3Includes: [Boolean]
    $PS4Includes: [Boolean]
    $PSNowIncludes: [Boolean]
    $SwitchIncludes: [Boolean]
    $WindowsIncludes: [Boolean]
    $XBOIncludes: [Boolean]
  ) {
    allGame(
      filter: {
        platforms: {
          GamePass: { in: $GamePassIncludes }
          Linux: { in: $LinuxIncludes }
          Mac: { in: $MacIncludes }
          PS3: { in: $PS3Includes }
          PS4: { in: $PS4Includes }
          PSNow: { in: $PSNowIncludes }
          Switch: { in: $SwitchIncludes }
          Windows: { in: $WindowsIncludes }
          XBO: { in: $XBOIncludes }
        }
      }
    ) {
      nodes {
        id
        title
      }
    }
  }
`;
