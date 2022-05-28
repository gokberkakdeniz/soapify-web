/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface RoundedButtonBaseProps {
  color: string;
}

export const RoundedButtonBase = styled.button<RoundedButtonBaseProps>`
  display: flex;
  align-items: center;
  padding: 0 6px;
  color: ${(props) => props.color};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${(props) => props.color};
  border-radius: 11px;
  cursor: ${(props) =>
    props.as === "button" || props.as === undefined ? "pointer" : "default"};
`;

function RoundedButton({
  children,
  color,
  ...buttonProps
}: Parameters<typeof RoundedButtonBase>[0]): JSX.Element {
  return (
    <RoundedButtonBase color={color} {...buttonProps}>
      {children}
      <div
        css={css`
          width: 16px;
          height: 16px;
          border-radius: 100%;
          background-color: ${color};
          margin-left: 6px;
          margin-right: -3px;
        `}
      />
    </RoundedButtonBase>
  );
}

export default RoundedButton;
