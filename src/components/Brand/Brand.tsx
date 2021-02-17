import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Brand = styled(Link)`
  font-weight: 500;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent.primary};
  :hover {
    color: ${({ theme }) => theme.colors.accent.terniary};
  }
  * {
    vertical-align: middle;
    display: inline-block;
  }
`;

export default Brand;
