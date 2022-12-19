import React, { FC, useState, useEffect } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";
import img from "../../images/placeholder-small.png"
import StartRating from "components/StartRating/StartRating";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import { getAvatar } from 'services/apiServices'
import Heading from "shared/Heading/Heading";
import { useNavigate } from "react-router-dom";


export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
  name?:string;
  description?:string;
  address?:string;
  data?:any;
  img?:any;
  userInfo? :any;
}
// userInfo.avatar


const SectionHero2: FC<SectionHero2Props> = ({ 
  className = "",
   name,
   description,
   address,
   data,
   img,
   userInfo
  }) => {

    const [avatar, setAvatar] = useState<any>("")
    const [userData, setUserData] = useState<any>("")
    let navigate = useNavigate(); 

    const getProfile = async(imgUrl : string) => {
      const response = await getAvatar(imgUrl);
      setAvatar(URL.createObjectURL(response))
      console.log(avatar)
    }

    const routeChange = () =>{ 
      navigate("/profile/user/edit");
    }

    const changeHandler = (e: { target: { files: any[]; }; }) => {
      if (!e.target.files[0]) return;
      setAvatar(e.target.files[0]);
    };


    useEffect(() => {
      if(userInfo.avatar)
        getProfile(userInfo.avatar)
    },[userInfo.avatar])
    console.log(userInfo.avatar)
  return (
    <div>

      <section className="text-gray-100 body-font h-50 flex bg-slate-100 dark:bg-slate-900 border-round-lg">
        <div className="container px-5 py-10 mx-auto ">
          <div className="p-5 flex items-center mx-auto   mb-1 rounded-lg sm:flex-row flex-col shadow-lg">
            <div className="sm:w-48 sm:h-48 h-50 w-50 sm:mr-10 inline-flex items-center justify-center flex-shrink-1">
              <img
                src={avatar && avatar} 
                className="border-round-lg"/>
            </div>
            <div className="flex-grow sm:text-left text-center mt-1 sm:mt-0">
              {/* <h1 className="text-black text-2xl title-font font-bold mb-2">Mc'Donalds</h1> */}
              <Heading
                children={userInfo.username}
                desc={userInfo.email}
                className="text-black dark:text-white"
              />
              <p className="text-black dark:text-white pb-2">{address}</p>
              <button 
              className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
              onClick={routeChange}>
                
                Edit Profile
                </button>
              {/* <StartRating
                className="mt-4"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionHero2; 
