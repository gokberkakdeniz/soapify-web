import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {
  Header,
  Brand,
  Layout,
  Main,
  Footer,
  Copyright,
  Code,
  Love,
  Soap,
  Status,
  Alert,
} from "./components";
import { getMessage } from "./helpers";
import { Home, Callback } from "./pages";

function App(): JSX.Element {
  const error = useSelector((state) => state.error);
  return (
    <Layout>
      <Header>
        <Brand to="/">
          <Soap width="32px" height="32px" /> soapify
        </Brand>
        <Status />
      </Header>
      <Main>
        {error.error && <Alert>{getMessage(error.message)}</Alert>}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/callback" exact>
            <Callback />
          </Route>
        </Switch>
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
