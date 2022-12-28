import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home-2"?: {};
  "/home-3"?: {};
  "/home-1-header-2"?: {};
  //
  "/listing-flights"?: {};
  //
  "/listing-stay"?: {};
  "/listing-stay-map"?: {};
  "/listing-stay-detail"?: {};
  //
  "/listing-experiences"?: {};
  "/listing-experiences-map"?: {};
  "/listing-experiences-detail"?: {};
  //
  "/listing-real-estate"?: {};
  "/listing-real-estate-map"?: {};
  "/listing-real-estate-detail"?: {};
  //
  "/listing-car"?: {};
  "/listing-car-map"?: {};
  "/listing-car-detail"?: {};
  //
  "/checkout"?: {};
  "/profile"?: {};
  "/profile/favourites"?: {};
  "/profile/payment"?: {};
  "/profile/myOrders"?: {};
  "/profile/account"?: {};
  "/profile/promotional"?: {};
  "/profile/route"?: {};


  
  "/pay-done"?: {};
  //
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-password"?: {};
  "/account-billing"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};
  //
  "/add-listing-1"?: {};
  "/add-listing-2"?: {};
  "/add-listing-3"?: {};
  "/add-listing-4"?: {};
  "/add-listing-5"?: {};
  "/add-listing-6"?: {};
  "/add-listing-7"?: {};
  "/add-listing-8"?: {};
  "/add-listing-9"?: {};
  "/add-listing-10"?: {};
  //
  "/author"?: {};
  "/restaurant/:id"?: {};
  "/search"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/packages"?: {};
  "/services"?: {};
  "/offers"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};

  "/profile/address/edit"?: {};
  "/address/edit"?: {};
  "/getAvatar/edit"?: {};

  "/forgotPassword"?: {};
  "/user/reset_password/:id/:token"?: {};
  "/logout"?: {};
  "/forgot_password/success"?: {};
  "/tracking"?: {};
  "/chat"?: {};
  
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
