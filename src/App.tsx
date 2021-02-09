import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { TokenContext } from './service/api';

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let tok = localStorage.getItem('token');
    if (tok) {
      setToken(tok);
    }
  }, [token]);

  return (
    <>
      <TokenContext.Provider value={{ token, setToken }}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (token ? <Redirect to="/home" /> : <Login />)}
            />
            <PrivateRoute path="/home" token={token} component={Home} />
            <Route exact component={NotFound} />
          </Switch>
        </Router>
      </TokenContext.Provider>
    </>
  );
}

const PrivateRoute = ({ token, component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    token !== null ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default App;
