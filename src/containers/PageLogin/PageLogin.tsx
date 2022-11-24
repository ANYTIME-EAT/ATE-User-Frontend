import { FC } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useNavigate } from 'react-router-dom';
import { loginApi } from "services/authServices";
import { toSafeInteger } from "lodash";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];



const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [authority, setAuthority] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async () => {
    var data ={
      "email": email,
      "password":password,
      "signedIn": false
    };
    const response=await loginApi(data);
    if(response.data){
      if(response.data.isLoggedIn){
        // console.log(response.data)
        localStorage.setItem("user-info", JSON.stringify(response.data.user));
        localStorage.setItem("access-token", response.data.token);
        navigate('/');
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
    }

    
    console.log(response.data);
    

    // localStorage.setItem("token", data.token)
    
  }

  
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || AnytimeEat</title>
      </Helmet>
     
      <div className="container mb-24 lg:mb-32">
         <ToastContainer/>
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6" >
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link to="/forgot-pass" className="text-sm">Forgot password?</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
