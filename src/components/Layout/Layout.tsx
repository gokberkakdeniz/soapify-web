import styled from "@emotion/styled";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto auto auto;
  @media screen and (max-width: 1024px) {
    margin: 0 1rem;
  }
`;

export default Layout;
