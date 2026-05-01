import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux";
import {
  Header,
  Brand,
  Layout,
  Main,
  Footer,
  Copyright,
  Code,
  Love,
  Status,
  Alert,
} from "./components";
import { getMessage } from "./helpers";
import { Home, Callback } from "./pages";

function App(): JSX.Element {
  const error = useAppSelector((state) => state.error);
  return (
    <Layout>
      <Header>
        <Brand to="/">
          <img
            width="32px"
            height="32px"
            src={`${process.env.PUBLIC_URL}/favicon.svg`}
            alt="Logo"
          />{" "}
          soapify
        </Brand>
        <Status />
      </Header>
      <Main>
        {error.error && <Alert>{getMessage(error.message)}</Alert>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Main>
      <Footer>
        Copyright <Copyright /> 2021{" "}
        <a href="https://akdeniz.dev">Gökberk Akdeniz</a>.{" "}
        <Code color="green" /> with <Love color="red" />
        in İzmir.
      </Footer>
    </Layout>
  );
}

export default App;
