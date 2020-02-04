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
function App() {


  // user - главный state, в нем хранится вся информация о текущем пользователе. Он изменяется по мере логина/выхода из системы.
  // !!!!!Пользователя скорее всего надо вообще поместить в контекст, который будет передаваться всем компонентам приложения. В зависимости от loggedin нужно будет перенаправлять пользователя 
  // const [user, setUser] = useState({
  //   username: "",
  //   email: "",
  //   loggedin: false,//это нужно добавить в хук, чтобы проверялся на залогиненность пользователя
  //   id: "",
  //   token: ""//!!!!не знаю пока, нужно ли хранить токен здесь или лучше в отдельной переменной.
  // });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");


  


  // Пример получения данных из api
  // Возможно в этом хуке нужно будет сначала проверять содержится ли токен в локальной памяти, поиск пользователя по токену
  // useEffect(() =>{
  //   axios.get('/api').then(response => {
  //     setUser(response.data);

  //   })
  // }, [])



  // Сначала нужно проверить, зашел ли пользователь в приложение. (Можно упростить и сделать без запоминания пользователей)
  // Если он не зашел, то сназу перенаправить его на экран логина, вне зависимости от того, на какой route он заходил

  // Если он зашел, то сразу показать ему homepage.


  // А вообще для самого начала нужно хотя бы протестировать работу с api в реакте.
  // Короче, наверное лучше пока что без запоминания сделать, потом если что можно доделать это




  // надо редиректить пользователя пока он не зайдет.
  return (

    <Router>
      <Nav/>
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
    </Router>
  );
}

export default App;

{/* <div className="App">
      
      </div> */}