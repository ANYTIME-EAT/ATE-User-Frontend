import { FC } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { loginApi } from "services/authServices";
import { toSafeInteger } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNav1 from "components/Header/MainNav1";

export interface LogoutProps {
  className?: string;
}


const Logout: FC<LogoutProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [authority, setAuthority] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   var data ={
  //     "email": email,
  //     "password":password,
  //     "signedIn": false
  //   };
  //   const response=await loginApi(data);
  //   if(response.data){
  //     if(response.data.isLoggedIn){
  //       // console.log(response.data)
  //       localStorage.setItem("user-info", JSON.stringify(response.data.user));
  //       localStorage.setItem("access-token", response.data.token);
  //       navigate('/');
  //     }else{
  //       toast.error(response.data.message,{
  //         position:toast.POSITION.TOP_CENTER
  //       });
  //     }
  //   }
  //   console.log(response.data);
  // }
  const login = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(username, email, password);
    const userData = {
      username,
      email,
      password,
    };
    localStorage.setItem("token-info", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    localStorage.removeItem("user-info");
    setIsLoggedIn(false);
  };

  return (
    <>

   
    </>
  );
};

export default Logout;
function handleApi() {
  throw new Error("Function not implemented.");
}
