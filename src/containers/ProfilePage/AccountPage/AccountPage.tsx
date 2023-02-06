import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { getAvatar, getUserDetailByIdAPI, updateProfile, uploadFileApi } from "services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import {img} from "images/avatars/Image-1.png"

export interface AccountPageProps {
  className?: string;
  userInfo?: any;
  
}

const AccountPage: FC<AccountPageProps> = ({ className = "", userInfo }) => {
  const [email, setEmail] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  const [userData, setUserData] = useState<any>("");
  const [avatar, setAvatar] = useState<any>("");
  const [updatedAvatar, setupdatedAvatar] = useState<any>("");
  const [file, setFile] = useState<any>("");
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [phone_no, setPhone_no] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [userDetailsData, setUserDetailsData] = useState<any>("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("user-info") || "{}").id)
    console.log("********************",userId)
  }, []);
  
  
  let navigate = useNavigate();

  const getProfileData = async () => {
    var userdata = {
      name: username,
      avatar:avatar,
      address:address,
      phone_no:phone_no,
      // password:password
    };

    console.log("44444444444444444444444444444",userdata)

    const response = await updateProfile(userdata,userId);
    console.log(response.data);

    if (response.data.response==="success") {
      setUserData(response.data);
      console.log(response.data);
      navigate("/profile");

      const newUpdatedUserInfo = {
        ...userInfo,
        "username":username,
        "email":email,
        
      };
      
      localStorage.setItem('user-info', JSON.stringify(newUpdatedUserInfo))
    } else {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [image, setImage] = useState<any>("")

  const getUserAvatar = async(img:any) => {
    const file2 = await getAvatar(img)
    setImage(URL.createObjectURL(file2))
    // setFile(URL.createObjectURL(file2))
  
  }

  const getUpdateduserAvatar = async(img:any) => {
    const file2 = await getAvatar(img)
    setupdatedAvatar(URL.createObjectURL(file2))

    // setFile(URL.createObjectURL(file2))
  
  }
  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("user-info") || "{}").email);
    setUsername(JSON.parse(localStorage.getItem("user-info") || "{}").username);
    setAvatar(JSON.parse(localStorage.getItem("user-info") || "{}").avatar) 
    getUserAvatar(JSON.parse(localStorage.getItem("user-info") || "{}").avatar)
    getUpdateduserAvatar(JSON.parse(localStorage.getItem("user-info") || "{}").avatar)
    
  }, [image]);


  const changeHandler = async(e:any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file',file);
    const file1 = await uploadFileApi(formData)
    .then(res => {
      console.log("999999999",res.data.filename);
      console.log(updatedAvatar)
      localStorage.setItem('user-info',JSON.stringify({imgAvatar:res.data.filename}));
      // alert("File uploaded successfully.")
      console.log("^^^^^^^^^^^^^^^^^^^",userInfo)

const newUpdatedUserInfo = {
  ...userInfo,
  "username":username,
  "avatar": res.data.filename,

};

localStorage.setItem('user-info', JSON.stringify(newUpdatedUserInfo))
      
})
};

useEffect(() => {
  let avatar=setAvatar(JSON.parse(localStorage.getItem("user-info") || "{}").avatar) 
  setupdatedAvatar(avatar)
  console.log(updatedAvatar)
}, [avatar]);
   
useEffect(() => {
  console.log(avatar)
  console.log(email);
}, [email,avatar]);

  useEffect(() => {
    console.log(avatar)
    console.log(email);
  }, [email,avatar]);

  const handleCancel = () => {
    navigate("/profile")
};

const getAllUserData = async () => {
  const response = await getUserDetailByIdAPI(JSON.parse(localStorage.getItem("user-info") || "{}").id);
  console.log("77777777777777777777777777777777777777",response.data.user);
  if (response.data) {
    if (response.data.user.length > 0) {
      let userArr = response.data.user;
      let tempData: any = [];
      userArr.map((item: any, key: number) => {
        tempData[key] = {
          address: item.address,
          phone_no: item.phone_no,
          password: item.password
        };
        setAddress(item.address)
        setPhone_no(item.phone_no)
        setPassword(item.password)
      });
      console.log(tempData);
      setUserDetailsData(userArr);
    }
  }
};
useEffect(() => {
  getAllUserData()
  console.log(getAllUserData())
}, []);

  return (
    <div className={`nc-AccountPage ${className} `} data-nc-id="AccountPage">
      <div className="space-y-6 sm:space-y-8 border border-neutral-200">
       
        <div className="pt-10 pb-10 flex flex-col md:flex-row items-center justify-center  bg-white  rounded-xl shadow-lg border-gray-700">
          
          <div className="flex-shrink-0 flex items-start">
            
            <div className="relative rounded-full overflow-hidden flex" >
              <Avatar sizeClass="w-32 h-32" imgUrl={image}/>
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer" >
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
                // value={image}
                onChange={changeHandler}
              />
              {/* <img src={image} alt="" /> */}
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-lg space-y-6">
          <h2 className="text-3xl font-semibold">Account infomation</h2>
            <div>
              <Label>Username</Label>
              <Input
                className="mt-1.5"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5"
                onChange={(e) => setEmail(e.target.value)}
                value={email}

              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                className="mt-1.5"
                onChange={(e) => setPhone_no(e.target.value)}
                value={phone_no}

              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                className="mt-1.5"
                onChange={(e) => setAddress(e.target.value)}
                value={address}

              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                className="mt-1.5"
                onChange={(e) => setPassword(e.target.value)}
                value={password}

              />
            </div>


            <div className="p-6 text-center">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={handleCancel}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none 
                focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex 
                items-center px-5 py-2.5 text-center ml-2"
                onClick={getProfileData} 
                
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

   
  );
};

export default AccountPage;
