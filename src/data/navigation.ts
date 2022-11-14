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
    href: "/contactUs",
    name: "Contact Us",
  },

];
