import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home.js';
import Post from './pages/Post.js';
import CreatePost from './pages/CreatePost.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { AuthContext } from './helpers/AuthContext.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound.js';
import Profile from './pages/Profile.js';
import ChangePassword from './pages/ChangePassword.js';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
      axios
      .get('http://localhost:3001/auth/auth', {
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response)=>{
        if(response.data.error){
          setAuthState({
            username: "",
            id: 0,
            status: false
          });
          alert(response.data.error);
          localStorage.removeItem("accessToken");
          window.location.href = "/login"; // Redirect to login page if not authenticated
        }
        else{
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });   
        }    
      })
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
      
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/createpost">Create Post</Link>
              </>
            )}
            {authState.status && (
              <button onClick={logout}>Logout</button>
            )}
            <h3>Welcome {authState.username}</h3>
          </div>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/createpost" exact Component={CreatePost} />
            <Route path='/post/:id' exact Component={Post} />
            <Route path="/login" exact Component={Login} />
            <Route path="/register" exact Component={Register} />
            <Route path="/profile/:id" exact Component={Profile} />
            <Route path="/changepassword" exact Component={ChangePassword} />
            <Route path="*" exact Component={PageNotFound} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App;
