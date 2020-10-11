import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import {
  togglePlatform,
  urlFromFilter,
  filterFromUrl,
  PLATFORMS,
} from "../filters";

export const PlatformSelector = () => {
  const { pathname } = useLocation();
  const currentFilter = filterFromUrl(pathname);
  console.log({ currentFilter, pathname });
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
