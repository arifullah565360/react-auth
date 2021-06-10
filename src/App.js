import './App.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Destination from './Component/Destination/Destination';
import React,{createContext,useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
  
} from "react-router-dom";
import LogIn from './LogIn/LogIn';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import NotFound from './Component/NotFound/NotFound';
import Blog from './Component/Blog/Blog';
import Contact from './Component/Contack/Contact';


 export const userContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <div>
     <userContext.Provider value={[loggedInUser , setLoggedInUser]}> 
    <Router>
       <Header></Header>
         <Switch>
           <Route path="/home">
                <Home></Home>
           </Route>
           <PrivateRoute path="/destination/:riderName">
              <Destination></Destination>
           </PrivateRoute>
           <Route path="/logIn">
                <LogIn></LogIn>
           </Route>
           <Route path="/blog">
                <Blog></Blog>
           </Route>
           <Route path='/contact'>
              <Contact></Contact>
           </Route>
           <Route exact path="/" >
              <Home></Home>
           </Route>
           <Route path="*">
              <NotFound></NotFound>
           </Route>

         </Switch>
      </Router>
      </userContext.Provider> 
    </div>
  );
}

export default App;
