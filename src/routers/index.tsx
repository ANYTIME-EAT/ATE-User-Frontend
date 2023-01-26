import React , {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import PagePackages from "containers/PagePackages/PagePackage";
import PageServices from "containers/PageServices/PageService";
import PageOffers from "containers/PagePromotions/PagePromotion";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import PageHome2 from "containers/PageHome/PageHome2";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import PageHome3 from "containers/PageHome/PageHome3";
import ProfilePromotional from "containers/ProfilePromotional/ProfilePromotional";
import ProfilePage from "containers/ProfilePage/ProfilePage";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import AccountPage from "containers/ProfilePage/AccountPage/AccountPage";
import NewRest from "containers/Restauraunt/NewRest";
import ForgotPasswordPage from "containers/Auth/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "containers/Auth/ResetPassword";
import Logout from "containers/Auth/Logout";
import ForgotPasswordSuccessPage from "containers/Auth/SuccessForgotPassword";
import { loginApi } from "services/authServices";
import { toast } from "react-toastify";
import Tracking from "containers/Tracking/Tracking";
import Chat from "containers/Chat/Chat"
import TableReservation from "containers/TableReservation/TableReservation";
import Reserve from "containers/TableReservation/Reserve";
import ReservationDone from "containers/TableReservation/ReservationDone";


export const AuthenticationAccesspages: Page[] = [

  { path: "/", exact: true, component: PageHome },
  // { path: "/#", exact: true, component: PageHome },
  { path: "/home-1-header-2", exact: true, component: PageHome },
  { path: "/home-2", component: PageHome2 },
  { path: "/home-3", component: PageHome3 },
  //
  { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail", component: ListingStayDetailPage },
  //
  {
    path: "/listing-experiences",
    component: ListingExperiencesPage,
  },
  {
    path: "/listing-experiences-map",
    component: ListingExperiencesMapPage,
  },
  {
    path: "/listing-experiences-detail",
    component: ListingExperiencesDetailPage,
  },
  //
  { path: "/listing-car", component: ListingCarPage },
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path: "/listing-car-detail", component: ListingCarDetailPage },
  //
  { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  { path: "/listing-real-estate", component: ListingRealEstatePage },
  //
  { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout", component: CheckOutPage },

  { path: "/profile", component: ProfilePage},
  { path: "/getAvatar/edit", component: AccountPage},
    
  { path: "/pay-done", component: PayPage },
  { path: "/tracking", component: Tracking },
  { path: "/chat", component: Chat },
  
  { path: "/author", component: AuthorPage },
  
  { path: "/profile/account", component: ProfilePage },
  { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists },
  { path: "/account-billing", component: AccountBilling },
  
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  
  { path: "/add-listing-1", component: PageAddListing1 },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-4", component: PageAddListing4 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/packages", component: PagePackages },
  { path: "/services", component: PageServices },
  { path: "/offers", component: PageOffers },
  { path: "/signup", component: PageHome },
  { path: "/login", component: PageLogin},
  { path: "/subscription", component: PageSubcription },

  { path: "/forgotPassword", component: ForgotPasswordPage },

  // restu 
  { path: "/restaurant/:id", component: NewRest },
  { path: "/restaurant", component: NewRest },
  
  
  { path: "/user/reset_password/:id/:token", component:ResetPasswordPage },

  { path: "/logout", component: Logout },

  { path: "/forgot_password/success", component: ForgotPasswordSuccessPage },

  { path: "/tableReservation", component: TableReservation },
  { path: "/reserved/:id",component:Reserve },
  { path: "/reservationDone", component: ReservationDone },

];

export const AllAccesspages : Page[] = [

  { path: "/", exact: true, component: PageHome },
  { path: "/login", exact: true, component: PageLogin},
  { path: "/signup", exact: true, component: PageSignUp },
  { path: "/profile", exact: true, component: PageLogin },
  { path: "/", exact: true, component: PageHome},

];

const MyRoutes = () => {
  const WIN_WIDTH = useWindowSize().width || window.innerWidth;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = async () => {
    var data ={
      "email": "email",
      "password":"password",
      "signedIn": false
    };
    
    const response=await loginApi(data);
    if(response.data){
      if(response.data.isLoggedIn){
        console.log(response.data)
        localStorage.setItem("user-info", JSON.stringify(response.data.user));
      
       
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
    }
    console.log(response.data);
  }

  useEffect(() => {
    if(localStorage.getItem("user-info")){
      setIsLoggedIn(true)
      console.log(isLoggedIn)
    }
  },[])

  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "chisfis" : ""}
    >
      <ScrollToTop />
      <SiteHeader />

      <Routes>
        {isLoggedIn?
        
        AuthenticationAccesspages.map(({ component, path }) => {
          const Component = component;
          
          return <Route key={path} element={<Component />} path={path} />;
        })
        :
        AllAccesspages.map(({ component, path }) => {
          const Component = component;
          
          return <Route key={path} element={<Component />} path={path} />;
        })
        }
        <Route element={<Page404 />} />
      </Routes>

      {WIN_WIDTH < 768 && <FooterNav />}
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
