
import {Navigate, useNavigate, Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const nav = useNavigate();
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    try {
      fetch('http://localhost:4000/profile', {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo({});
        });
      });
    } catch (error) {
      console.log(error.message);
    }
    
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null); // Clear user info on successful logout
      nav('/');
      window.location.reload();
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
