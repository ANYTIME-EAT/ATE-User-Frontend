import { Popover, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { getAvatar } from "services/apiServices";

import avatar1 from "images/avatars/Image-1.png";

const solutionsFoot = [
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
  },
  {
    name: "Help",
    href: "##",
    icon: LifebuoyIcon,
  },
  {
    name: "Logout",
    href: "/login",
    icon: ArrowRightOnRectangleIcon,
  },
];


export default function AvatarDropdown() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const logout = () => {
    console.log("sdsd")
    localStorage.removeItem("user-info");
    setIsLoggedIn(false);
  };

  const [image, setImage] = useState<any>("")
  const [avatar, setAvatar] = useState<any>("")

  const getUserAvatar = async(img:string) => {
    const file = await getAvatar(img)
    setImage(URL.createObjectURL(file))
  
  }
  useEffect(() => {
    setAvatar(JSON.parse(localStorage.getItem("user-info") || "{}").avatar)
  }, []);

  useEffect(() => {
    console.log(avatar)
    getUserAvatar(avatar)
  }, [avatar]);

  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" imgUrl={image} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-4 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          {item.name==="Logout"?<p className="text-sm font-medium " onClick={logout}>{item.name}</p>:
                          <p className="text-sm font-medium">{item.name}</p>
                        }
                        </div>
                      </Link>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
