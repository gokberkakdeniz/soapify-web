import styled from "@emotion/styled";

const Button = styled.button`
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.accent.primary};
  border-radius: 2px;
  :hover:not(:disabled),
  :focus:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.terniary};
  }
  :focus {
    border-color: ${({ theme }) => theme.colors.accent.secondary};
  }
  :disabled {
    cursor: default;
    opacity: 0.8;
  }
  background-color: ${({ theme }) => theme.colors.background.secondary};
  width: 10rem;
  max-width: 100%;
  margin: 0.5rem;
`;

export default Button;
