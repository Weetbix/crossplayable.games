import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import {
  togglePlatform,
  urlFromFilter,
  filterFromUrl,
  PLATFORMS,
} from "../filters";
import { FilterPageQuery } from "../../graphql-types";

const Header = () => {
  const { pathname } = useLocation();
  const currentFilter = filterFromUrl(pathname);
  return (
    <ul>
      {PLATFORMS.map((platform) => (
        <li>
          <Link to={urlFromFilter(togglePlatform(currentFilter, platform))}>
            {platform}
          </Link>
        </li>
      ))}
    </ul>
  );
};

type FilterPageProps = {
  data: FilterPageQuery;
};
const FilterPage = (props: FilterPageProps) => {
  return (
    <>
      <Header />
      {props.data.allGame.nodes.map((node) => (
        <p>{node.title}</p>
      ))}
    </>
  );
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
