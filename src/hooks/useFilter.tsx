import { useLocation } from "@reach/router";
import { filterFromUrl } from "../filters";

export const useFilter = () => {
  const { pathname } = useLocation();
  return filterFromUrl(pathname);
};
