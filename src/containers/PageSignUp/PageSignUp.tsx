import React, { FC, useState, useEffect } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { userRegister } from "services/authServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];



const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const handleApi = async ()  => {
    const isValidPassword = passwordValidation(password,confirmPassword)
    if (isValidPassword){
      const data = {
        username: username,
        address: address,
        authority: { "role": ["user"] },
        phone_no:phone,
        email: email,
        password: password,
      }
      
      const response = await userRegister(data)
      if(response.data){
        if( response.data.response === "success" ) {
          toast.success("Sign Up Success", {
            position: toast.POSITION.TOP_CENTER
          })
        }else{
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        }
      }
      

    }else{
      toast.error("Password and confirm password not matching", {
        position: toast.POSITION.TOP_CENTER
      })
    }
    



  }

  const passwordValidation = (password : string,confirmPassword:string) => {
    if (password === confirmPassword){
      return true
    }
    else{
      return false
    }
  }


  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || EUROPE TOURS & TRAVELS</title>
      </Helmet>
      

      <div className="container mb-24 lg:mb-32">
        <ToastContainer />
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
          {/* <img
            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard/assets/img/drake.jpg"
            alt="avatar image"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-all duration-200 ease-in-out text-lg rounded-circle "
          /> */}
        </h2>

        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
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
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={(e) => { e.preventDefault(); handleApi() }}>
            <label className="block">
              <Input
                type="text"
                placeholder="User Name"
                className=""
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                required={true}
              />

            </label>
            <label className="block">
              <Input
                type="email"
                placeholder="example@example.com"
                className=""
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required={true}
              />
            </label>
            <label className="block">
              <Input
                type="text"
                placeholder="Address"
                className=""
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
                
              />
            </label>
            <label className="block">
              <Input
                type="text"
                placeholder="+123456789"
                className=""
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                
              />
            </label>
            <label className="block">

              <Input type="password"
                placeholder="Password"
                className=""
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required={true} />
            </label>
            <label className="block">

              <Input type="password"
                placeholder="Confirm Password"
                className=""
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                required={true} />
            </label>

            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
