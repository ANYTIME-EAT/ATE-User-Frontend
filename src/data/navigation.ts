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
>>>>>>> e24f4beabd6b2f922a2843915f0147ca7051e95f
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
  },
  {
    id: ncNanoId(),
    href: "/services",
    name: "Services",
=======
>>>>>>> e24f4beabd6b2f922a2843915f0147ca7051e95f
  },
];
