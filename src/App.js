import React from 'react';
import Header from './components/Header';
import './App.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Ballon from './components/Ballon';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Chat from './components/Chat'
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from './components/SidebarOptions';
import Login from './components/Login';
import Spinner from "react-spinkit";
function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
          <AppLoadingContents>
            <img src="https://techlife.news/wp-content/uploads/2020/09/reddit.jpg" alt="" />

            <Spinner
              name="ball-spin-fade-loader"
             color="red"
             fadeIn="none"
            />
          </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="app">
     <Router>
       {!user ? (
         <Login />
       ):
       (
        <>

        <Header></Header>
        <AppBody>
          <Sidebar />
        <Switch>         
            <Route path="/" component={Chat} exact >
              {/* <Chat /> */}
            </Route>
             <Route path="/about" component={Ballon} exact>
             {/* <Ballon /> */}
             </Route>
          </Switch>
  
        </AppBody>
          
        </>
       )}
      
    </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  
    text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    margin-bottom: 40px;
    padding: 20px;
  }
`;

const AppBody = styled.div`
    display: flex;
    height: 100vh;
`