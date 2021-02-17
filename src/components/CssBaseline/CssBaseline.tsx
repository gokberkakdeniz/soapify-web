/* @jsxImportSource @emotion/react */
import { css, Global, useTheme } from "@emotion/react";
import { ReactElement } from "react";
import { forms, sanitize, typography } from "emotion-sanitize";

const CssBaseline = (): ReactElement => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;500&display=swap");
        ${sanitize}
        ${typography}
        ${forms}
        body {
          font-family: "Merriweather Sans", sans-serif;
          background-color: ${theme.colors.background.primary};
          color: ${theme.colors.text.primary};
        }
      `}
    />
  );
};

export default CssBaseline;
