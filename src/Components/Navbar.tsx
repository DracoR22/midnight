import Image from "next/image";
import Link from "next/link";
import Search from "./Icons/Search";
import { useRouter } from "next/router";
import { type KeyboardEvent, useState, type ChangeEvent, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserImage } from "./Components";
import DotsVertical from "./Icons/DotsVertical";
import Button from "./Buttons/Button";
import User from "./Icons/User";
import Brush from "./Icons/Brush";
import HelpCircle from "./Icons/HelpCircle";
import Settings from "./Icons/Settings";
import MessagePlusSquare from "./Icons/MessagePlusSquare";
import File from "./Icons/File";
import Lock from "./Icons/Lock";
import LogOut from "./Icons/LogOut";

interface NavbarProps {
    children?: JSX.Element;
  }
  
  interface NavigationItem {
    icon: (className: string) => JSX.Element;
    name: string;
    path: string;
    lineAbove: boolean;
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  export default function Navbar({ children }: NavbarProps) {

    const { data: sessionData } = useSession();
    const userId = sessionData?.user.id;

    const signedInNavigation: NavigationItem[] = [
        {
          icon: (className) => <User className={className} />,
          name: "View Profile",
          path: `/${String(userId)}/ProfileVideos`,
          lineAbove: true,
        },
        {
          icon: (className) => <Brush className={className} />,
          name: "Creator Studio",
          path: "/Dashboard",
          lineAbove: false,
        },
        {
          icon: (className) => <HelpCircle className={className} />,
          name: "Help",
          path: "/Blog/Help",
          lineAbove: true,
        },
        {
          icon: (className) => <Settings className={className} />,
          name: "Settings",
          path: "/Settings",
          lineAbove: false,
        },
        {
          icon: (className) => <MessagePlusSquare className={className} />,
          name: "Feedback",
          path: "#",
          lineAbove: false,
        },
        {
          icon: (className) => <File className={className} />,
          name: "Terms of Service",
          path: "/Blog/TOS",
          lineAbove: true,
        },
        {
          icon: (className) => <Lock className={className} />,
          name: "Privacy",
          path: "/Blog/Privacy",
          lineAbove: false,
        },
        {
          icon: (className) => <LogOut className={className} />,
          name: "Log Out",
          path: "sign-out",
          lineAbove: true,
        },
      ];
    
      const signedOutNavigation: NavigationItem[] = [
        {
          icon: (className) => <HelpCircle className={className} />,
          name: "Help",
          path: "/Blog/Help",
          lineAbove: true,
        },
        {
          icon: (className) => <MessagePlusSquare className={className} />,
          name: "Feedback",
          path: `mailto:vidchill@vidchill.com`,
          lineAbove: false,
        },
        {
          icon: (className) => <File className={className} />,
          name: "Terms of Service",
          path: "/Blog/TOS",
          lineAbove: true,
        },
        {
          icon: (className) => <Lock className={className} />,
          name: "Privacy",
          path: "/Blog/Privacy",
          lineAbove: false,
        },
      ];

    const Navigation = sessionData ? signedInNavigation : signedOutNavigation;

    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();
  
    const handleSearch = async () => {
      try {
        await router.push({
          pathname: "/SearchPage",
          query: { q: searchInput },
        });
      } catch (error) {
        console.error("Error navigating to search page:", error);
      }
    };
 
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          void handleSearch();
        }
      };

    return (
     <>
       <div className="fixed z-50 w-full bg-[#282828] shadow-sm border-b border-neutral-700"> 
         <div className="mx-auto flex max-w-full px-6 lg:px-16 xl:grid xl:grid-cols-12">
           <div className="flex flex-shrink-0 items-center lg:static xl:col-span-2">
             <Link href="/#" aria-label="Home">
              <Image src='/bgpanda.png' alt="logo" width={300} height={300} className="w-12 h-12"/>
            </Link>
           </div>
           <div className="w-full min-w-0 flex-1 lg:px-0 xl:col-span-8">
            <div className=" g:mx-0 flex items-center px-6 py-4 lg:max-w-none xl:mx-0 xl:px-0">
             <div className="w-full">
             <label htmlFor="search" className="sr-only">
                  Search
             </label>
             <div className="relative">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <Search className="h-5 w-5 stroke-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              className="block text-white bg-neutral-700 w-full py-1.5 pl-10
               pr-3 rounded-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Search"
              type="search"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              />
             </div>
             </div>
            </div>
           </div>
           <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            {children}
          </div>
          <div className="m-0 hidden w-max px-0 lg:flex lg:items-center lg:justify-end xl:col-span-2">
            <Menu as="div" className="relative ml-5 flex-shrink-0">
            <div>
                <Menu.Button className="flex rounded-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                  {sessionData ? (
                    <UserImage image={sessionData?.user.image || ""} />
                  ) : (
                    <DotsVertical className="w-5 stroke-white" />
                  )}
                </Menu.Button>
              </div>
              <Transition as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-700 py-1 shadow-lg ring-black ring-opacity-5 focus:outline-none">
                {sessionData ? (
                    <div className=" mx-4 my-2 flex  ">
                      <div className="h-9 w-9"> 
                      <UserImage image={sessionData?.user.image || ""} />
                      </div> 
                      <div className="ml-2 flex w-full flex-col justify-start truncate ">
                        <p className="truncate text-sm font-semibold text-neutral-300">
                          {sessionData && <span>{sessionData.user?.name}</span>}
                        </p>
                        <p className=" truncate text-sm text-neutral-300">
                          {sessionData && (
                            <span className="">{sessionData.user?.email}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mx-4 my-2 flex text-center text-sm font-semibold">
                      Menu
                    </p>
                  )}
                   {Navigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.path === "sign-out") {
                              void signOut();
                            } else {
                              void router.push(item.path || "/");
                            }
                          }}
                          href={item.path || "/"}
                          className={classNames(
                            active ? "bg-neutral-500" : "",
                            "block px-4 py-2 text-sm text-neutral-300",
                            item.lineAbove ? "border border-neutral-600" : ""
                          )}
                        >
                          <div className="flex items-center ">
                            {item.icon("h-4 w-4 stroke-neutral-300")}
                            <div className="pl-2">{item.name}</div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
              </Menu>
              {sessionData ? (
              ""
            ) : (
              <div className="flex flex-row space-x-3 p-2">
                <Button
                  variant="tertiary-gray"
                  size="md"
                  onClick={!sessionData ? () => void signIn() : () => ""}
                  className="text-white"
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={!sessionData ? () => void signIn() : () => ""}
                  className="px-4 py-2"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
         </div>
       </div>
     </>
    )
  }