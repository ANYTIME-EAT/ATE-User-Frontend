import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React, { useEffect, useState } from "react";
import Input from "shared/Input/Input";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "COMPANY",
    menus: [
      { href: "#", label: "Who We Are" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Report Fraud" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    id: "2",
    title: "FOR FOODIES",
    menus: [
      { href: "#", label: "Code of Conduct" },
      { href: "#", label: "Community" },
      { href: "#", label: "Blogger Help" },
      { href: "#", label: "Mobile Apps" },
    ],
  },
  {
    id: "3",
    title: "FOR RESTAURANTS",
    menus: [{ href: "#", label: "Add restaurant" }],
  },
  {
    id: "4",
    title: "FOR YOU",
    menus: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Security" },
      { href: "#", label: "Sitemap" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const [email, setEmail] = useState<string>("");

  // useEffect(() => {
  //   setEmail(JSON.parse(localStorage.getItem("user-info") || "{}").email);
  //   console.log(name)
  // }, []);

  const handleData = async () => {
    const data = {
      email: email,
    };
    console.log("777777777777777777777", email);
    // const response = await tableReservationAPI(data, id);
    // console.log("table reservation data", response);
    // if (response.data) {
    //   if (response.data.response === "success") {
    //     console.log("REservation done pass data", data);
    //     navigate("/reservationDone", { state: { data: data } });
    //   } else {
    //     console.log("Reservation failure");
    //   }
    // }
  };

  return (
    <div className="nc-Footer relative py-8 border-t border-neutral-200 dark:border-neutral-700 bg-footer">
      <h2 className="text-center text-3xl pb-4">
        Subscribe for Special Offers
      </h2>
      <div className=" flex justify-center items-center pb-8">
        <div className="relative">
          <input
            type="text"
            className="h-11 w-96 pl-10 pr-20 rounded-full z-0 focus:shadow focus:ring-2 focus:ring-red-300 focus:border-transparent"
            placeholder="Enter your Email..."
          />
          <div className="absolute top-2 right-2">
            <button className="h-8 w-25 text-white rounded-full p-1 hover:bg-red-600 bg-footerSubscribeButton">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
