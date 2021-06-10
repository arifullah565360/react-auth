
import { useState } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './LogIn.css'
import { useContext } from 'react';
import { userContext } from '../App';

import { useHistory, useLocation } from 'react-router';





if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function LogIn() {

  const [loggedInuser, setLoggedInuser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };


  const [newUser, SetNewUser] = useState(false);
  const [user, setUser] = useState({
    inSignedIn: false,

    name: '',
    email: '',
    password: '',
    photo: ''
  })
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const provider = new firebase.auth.GoogleAuthProvider();

  const fbHandle = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;

        var accessToken = credential.accessToken;
        setUser(result)
        setLoggedInuser(result)
        history.replace(from)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

      });
  }



  const handleSignIn = () => {

    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)
        setLoggedInuser(signInUser)
        history.replace(from)
      })
      .catch(err => { })
  }
  const handleSignOut = () => {

    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn: false,

          name: '',
          photo: '',
          email: '',
          error: '',
          success: false
        }
        setUser(signOutUser)
      })
      .catch(err => { })
  }
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
  }
  const handleClick = (e) => {
    if (newUser && user.name && user.password) {
      console.log(user.name, user.password, "submit")
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log(res)
          updateUserName(user.name)

        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });

    }

    if (!newUser && user.email && user.password) {

      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInuser(newUserInfo)
          history.replace(from)
          console.log(res)
          console.log('sing in user info', res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }
  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log('user name update Successfully');
    }).catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div className="login">
    
    <div className="creat">
      <h1>Login</h1>
      <input  type="checkbox" onChange={() => SetNewUser(!newUser)} name="newUser" id="" />


      <label htmlFor="newUser">new sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input className="inputDisign" name="name" type="text" onBlur={handleBlur} placeholder="Enter Your Name" />}
        <br />
        <input className="inputDisign" type="email" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
        <br />
        <input className="inputDisign" type="password" name="password" onBlur={handleBlur} placeholder="You Password Hare" required />
        <br />
        {/* <input type="submit" value="submit" /> */}
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
      <button className="mainbtn" onClick={handleClick}>{newUser ? 'Sign up' : 'Sign in'}</button>
    </div>
      <div className="google">
        <h1>Who Are You</h1>
        {
        user.isSignedIn ? <button onClick={handleSignOut} className="googlebtn">sign out</button> :
          <button className="googlebtn" onClick={handleSignIn}>sign in</button>
        }
        <br />
      
      </div>
    </div>
  );
}

export default LogIn;

