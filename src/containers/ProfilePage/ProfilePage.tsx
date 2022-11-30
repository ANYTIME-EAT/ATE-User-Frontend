import React, { FC, Fragment, useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import SectionHero2 from "./components/SectionHero2";
import RestraurantPage from "./RestraurantPage";
import ManageAddress from "./contents/ManageAddress";
import PromotionalSectionStatistic from "./contents/PromotionalSectionStatistic";
import PaymentSectionStatistic from "./contents/PaymentSectionStatistic";
import SectionGridAllprofileMenu from "./contents/SectionGridAllProfileMenu";
import SectionGridFilterCardMyOrders from "./contents/SectionGridFilterCardMyOrders";
import AccountPage from "./AccountPage/AccountPage";


export interface AuthorPageProps {
  className?: string;
}

const ProfilePage: FC<AuthorPageProps> = ({ className = "" }) => {
  const [restaurant, setresturant] = useState<any>([])
  const [userInfo, setUserInfo] = useState<any>({})
  const [activePage, setActivePage] = useState<any>({id: 0, title: "Manage Address"});

  const handleActivePage = (id: number, title: string) => {
    setActivePage({id:id, title:title})
  }

  const getUserInfo = () => {
    if(localStorage.getItem("user-info")){
      const response = localStorage.getItem('user-info');
      if(response){
        console.log(JSON.parse(response))
        setUserInfo(JSON.parse(response))
      }
    }else{
      setUserInfo({})
    }
  }

  useEffect(() => {
    getUserInfo()
  },[])
 
  const renderSidebar = () => {
      return (
        <RestraurantPage handleActivePage={handleActivePage}/>
      );
  };

  // body part
  const renderSection1 = () => {
    if(activePage.title === "Manage Address"){
      return (
        <div className=" flex-1 p-7">
          <ManageAddress/>
        </div>
      );
    }else if(activePage.title === "Payment"){
      return (
        <div className=" flex-1 p-7">
          <PaymentSectionStatistic/>
        </div>
      );
    }
    else if(activePage.title === "My Order"){
      return (
        <div className=" flex-1 p-7">
          <SectionGridFilterCardMyOrders/>
        </div>
      );
    }
    else if(activePage.title === "Favourites"){
      return (
        <div className=" flex-1 p-7">
          <SectionGridAllprofileMenu/>
        </div>
      );
    }
    else if(activePage.title === "Referral"){
      return (
        <div className=" flex-1 p-7">
          <PromotionalSectionStatistic/>
        </div>
      );
    }
    else if(activePage.title === "Edit Profile"){
      return (
        <div className=" flex-1 p-7">
          <AccountPage/>
        </div>
      );
    }
  };

  // user profile page
  const heroSection = () => {
      return(
        <SectionHero2 data={restaurant}  userInfo={userInfo}/>
      );
  }
  return (

    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <div>{heroSection()}</div>
      <Helmet>
        <title>Restraunt || ATE</title>
      </Helmet>
      <main className="flex flex-row ">
        <div className="">{renderSidebar()}</div>
        <div className="w-full  space-y-4 lg:space-y-10 lg:pl-1 flex-shrink  ">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;