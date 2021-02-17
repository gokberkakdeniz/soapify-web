/* @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { PropsWithChildren, useMemo } from "react";
import { Exclamation, Information } from "../Icons";

interface AlertContainerProps {
  borderColor: string;
  backgroundColor: string;
}

const AlertContainer = styled.div<AlertContainerProps>`
  display: flex;
  align-items: center;
  height: 50px;
  border-width: 2px;
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColor};
  padding: 0px 10px;
`;

interface AlertProps {
  variant?: "error" | "info";
}

const Alert = ({
  variant = "error",
  children,
}: PropsWithChildren<AlertProps>): JSX.Element => {
  const theme = useTheme();

  const alertContainerProps = useMemo(() => {
    switch (variant) {
      case "error":
        return {
          borderColor: theme.colors.error.primary,
          backgroundColor: theme.colors.error.secondary,
        };
      case "info":
        return {
          borderColor: theme.colors.accent.primary,
          backgroundColor: theme.colors.accent.terniary,
        };
      default:
        throw new Error("invalid");
    }
  }, [theme, variant]);

  const icon = useMemo(() => {
    switch (variant) {
      case "error":
        return <Exclamation height="24px" width="24px" />;
      case "info":
        return <Information height="24px" width="24px" />;
      default:
        throw new Error("invalid");
    }
  }, [variant]);

  return (
    <AlertContainer
      {...alertContainerProps}
      css={css`
        div {
          * {
            vertical-align: middle;
          }
          svg {
            padding-top: 3px;
            margin-right: 10px;
          }
        }
      `}
    >
      <div>{icon}</div>
      <div>{children}</div>
    </AlertContainer>
  );
};

export default Alert;
