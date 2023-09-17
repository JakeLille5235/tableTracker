import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import all the components we need in our app (for specific pages)
import Login from "./components/login";
import LandingPage from "./components/landingPage";
import Signup from "./components/signup";
import Home from "./components/home";
import ServerList from "./components/serverList";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("token") !== null;

  // If the user is authenticated, render the component
  // Otherwise, redirect to a login page or show an access denied message
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};
 
const App = () => {
  //' where actual javascript will go '
  
  return ( // routes to html
   <div>
     <Routes>
       <Route exact path="/" element={<LandingPage />} />
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/signup" element={<Signup />} />
       <Route exact path="/home" element={<ProtectedRoute element={<Home />} />} />
       <Route exact path="/serverlist" element={<ServerList />} />
     </Routes>
   </div>
 );
};
 
export default App;