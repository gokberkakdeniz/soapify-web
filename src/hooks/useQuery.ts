import { useLocation } from "react-router-dom";

function useQuery<
  S extends Record<string, string>,
  H extends Record<string, string>
>(): [S, H] {
  const { search, hash } = useLocation();

  return [
    Object.fromEntries(new URLSearchParams(search)),
    Object.fromEntries(new URLSearchParams(hash.slice(1))),
  ] as [S, H];
}

export default useQuery;
