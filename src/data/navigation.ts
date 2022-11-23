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
    href: "/restaurant",
    name: "Restaurant",
    isNew: true,
  },
  {
    id: ncNanoId(),
<<<<<<< HEAD
    href: "/services",
    name: "Services",
=======
    href: "/contactUs",
    name: "Contact Us",

>>>>>>> c87cabee1507ba1d2c9d3a695edc711b30241ae0
  },
  {
    id: ncNanoId(),
    href: "/packages",
    name: "Packages",
  },
  {
    id: ncNanoId(),
    href: "/offers",
    name: "Promotions",
  },
  {
    id: ncNanoId(),
    href: "/author",
    name: "rest demo"
  },
  {
    id: ncNanoId(),
    href: "/listing-real-estate",
    name: "card"
<<<<<<< HEAD
=======
  },
  {
    id: ncNanoId(),
    href: "/services",
    name: "Services",
>>>>>>> c87cabee1507ba1d2c9d3a695edc711b30241ae0
  },
];
