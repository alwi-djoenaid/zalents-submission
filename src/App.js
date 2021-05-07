import logo from './logo.svg';
import './App.css';

import {Router, Route, Switch, Redirect, withRouter} from "react-router-dom";

import Appbar from './components/Layout/Appbar.js';
import Layout from './components/Layout/Layout';

import Homepage from './components/Homepage';
import Aboutme from './components/Aboutme';
import Auth from './components/Auth';
import AuthContainer from './container/AuthContainer';
import TodoContainer from './container/TodoContainer';
import { useEffect } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App2(props){
  const authContainer = AuthContainer.useContainer()
  let routes;
  let privateRoutes;

  useEffect(() => {
    props.history.push(props.location);
    authContainer.onTryAutoSignIn()
      .then(() => {
        setTimeout(() => {
          
        }, 3000);
      })
      .catch(() => {
        authContainer.logout();
      })
  }, []);

  routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );

  privateRoutes = (
    <TodoContainer.Provider>
      <Layout>
        <Switch>
          <Route path="/home" exact component={Homepage} />
          <Route path="/aboutme" exact component={Aboutme} />
          <Route path="/auth" exact component={Auth} />
          <Redirect to="/home" />
        </Switch>
      </Layout>
    </TodoContainer.Provider>
  );

  return(
    <>
      {authContainer.isAuthenticated ? privateRoutes : routes}
    </>
  );
}

export default withRouter(App2);