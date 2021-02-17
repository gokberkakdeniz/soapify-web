/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Dispatch, SetStateAction, useCallback } from "react";

interface ToggleSearchCriteriaProps {
  searchTypes: readonly string[];
  searchType: number;
  setSearchType: Dispatch<SetStateAction<number>>;
}

const ToggleSearchCriteria = ({
  searchTypes,
  searchType,
  setSearchType,
}: ToggleSearchCriteriaProps): JSX.Element => {
  const theme = useTheme();

  const handle = useCallback(
    () => setSearchType((type) => (type + 1) % searchTypes.length),
    [searchTypes.length, setSearchType]
  );

  return (
    <span
      role="button"
      tabIndex={0}
      css={css`
        cursor: pointer;
        outline: none;
        color: ${theme.colors.accent.terniary};
        border-bottom: 1px dotted ${theme.colors.accent.terniary};
      `}
      onKeyDown={(event) => {
        if (event.key === "Enter") handle();
      }}
      onClick={handle}
    >
      {searchTypes[searchType]}
    </span>
  );
};

export default ToggleSearchCriteria;
