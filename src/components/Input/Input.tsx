import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px dashed ${({ theme }) => theme.colors.accent.primary};
  outline: none;
  :focus {
    border-color: ${({ theme }) => theme.colors.accent.secondary};
  }
  border-radius: 2px;
  width: 40rem;
  max-width: 100%;
  margin: 0.5rem;
`;

export default Input;
