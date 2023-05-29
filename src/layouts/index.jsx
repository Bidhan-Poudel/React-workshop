import React, { useContext } from "react";
import Header from "./header";
import { UserContext } from "../contexts/usercontext";
import Login from "../pages/login";
import {Toaster} from "react-hot-toast";

const Layout = ({ children }) => {
  const {isLoggedIn} = useContext(UserContext)
  console.log(isLoggedIn, children)
  return (
    <div 
      className="mx-20 my-5 flex flex-col items-center"
    >
      {isLoggedIn ?(<><Header />{ children}</> ) : <Login/>}
      <Toaster position="bottom-right"/>
    </div>
  );
};

export default Layout;
