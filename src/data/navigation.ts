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
    href: "/contactUs",
    name: "Contact Us",
=======
    href: "/services",
    name: "Services",
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
>>>>>>> dd64e54f580c50e77d709b715e9b28d49f1f849e
  },
];
