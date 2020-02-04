import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import Login from './components/Login';
import Protected from './components/Protected';
import Register from './components/Register';
import AddPost from './components/AddPost';
import MyPosts from './components/MyPosts';
import Nav from './components/Nav';
import {Context} from './Context';
import { getJwt } from './helpers/jwt';

function App() {


  const [loggedIn, setLoggedIn] = useState(checkLoggedIn());


  function checkLoggedIn(){
    const jwt = getJwt();
    if (jwt) return true;
    else return false;
  }


  const setLoggedInTrue = function(){
    setLoggedIn(true);
  }
  const setLoggedInFalse = function(){
    setLoggedIn(false);
  }

  return (

    <Router>
      <Context.Provider value={{setLoggedInTrue, setLoggedInFalse}}>
      <Nav loggedIn={loggedIn}/>
      <Switch>

        {/* <Nav></Nav> */}
        {/* <Route path="/" component={Nav}/> */}
        <Route path="/" exact component={Home}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Login" component={Login}/>
        
        <AuthenticatedComponent>
          <Route path="/Protected" component={Protected}/>
          <Route path="/addPost" component={AddPost}/>
          <Route path="/myPosts" component={MyPosts}/>
          
          

        </AuthenticatedComponent>

        </Switch>
      </Context.Provider>
      
    </Router>
  );
}

export default App;

{/* <div className="App">
      
      </div> */}