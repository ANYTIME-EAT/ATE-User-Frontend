import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
//import __megamenu from "./jsons/__megamenu.json";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/offers",
    name: "Promotions",
  },
  {
    id: ncNanoId(),
    href: "/listing-real-estate",
    name: "Card"
  },
  {
    id: ncNanoId(),
    href: "/restaurant",
    name: "Restaurant"
  },
  {
    id: ncNanoId(),
    href: "/signup",
    name: "Signup"
  },

  // {
  //   id: ncNanoId(),
  //   href: "/logout",
  //   name: "Logout"
  // },
];
