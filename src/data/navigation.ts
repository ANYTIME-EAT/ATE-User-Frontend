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
    href: "/about",
    name: "About",
    isNew: true,
  },
  {
    id: ncNanoId(),
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
    href: "/contact",
    name: "Contact"
  },
];
