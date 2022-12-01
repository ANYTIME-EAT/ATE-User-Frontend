import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { updateProfile } from "services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface AccountPageProps {
  className?: string;
  userInfo? :any;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" ,userInfo}) => {
  const [email, setEmail] = useState<any>("")
  const [username, setUsername] = useState<any>("")
  const [userData, setUserData] = useState<any>("")
  let navigate = useNavigate(); 
  
  // const getProfileData = async(data:any) => {
  //   const response = await updateProfile(data);

  //   setUserData(response.data)
  //   console.log(response.data);
  // }

  const getProfileData = async () => {
    var userdata ={
    "username":username,
    "email":email
    };
    console.log(userdata)
    const response=await updateProfile(userData);
    console.log(response);
    if(response.data>0){
      setUserData(response.data);
      console.log(response.data);
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
  }


  useEffect(() => {
    // if(userInfo)
    // getProfileData()
    setEmail(JSON.parse(localStorage.getItem("user-info")|| "{}").email)
    setUsername(JSON.parse(localStorage.getItem("user-info")|| "{}").username)
    // console.log(userInfo);

  },[])
  useEffect(()=>{
    console.log(email)
  },[email])

  const routeChange = () =>{ 
    navigate("/profile");
  }

  
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || AntimeEat</title>
      </Helmet>
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Username</Label>
                <Input className="mt-1.5"
                onChange={(e) => setUsername(e.target.value)} 
                value={username}/>
              </div>
           
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" onChange={(e) => setEmail(e.target.value)} 
                value={email}/>
              </div>
             
              {/* <div>
                <Label>Phone number</Label>
                <Input className="mt-1.5" defaultValue="003 888 232" />
              </div> */}
              
              <div className="w-1/2">
        <button type="submit"
        className="w-40 space-x-4 font-semibold border border-slate-500 bg-white hover:bg-gray-200 
        text-black p-2 ml-6 rounded text-sm float-right" 
        // onClick={getProfileData}
        onClick={routeChange}
        >
            Update
        </button>
        
        <button type="submit" className="w-40 font-semibold border border-slate-500 bg-white hover:bg-gray-200 text-black p-2 rounded text-sm float-right">
            Cancel
        </button>
    </div>
            </div>
          </div>
        </div>
      {/* </CommonLayout> */}
    </div>
  );
};

export default AccountPage;
