import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Home from "./Icons/Home";
import ThumbsUp from "./Icons/ThumbsUp";
import ClockRewind from "./Icons/ClockRewind";
import VideoRecorder from "./Icons/VideoRecorder";
import Folder from "./Icons/Folder";
import UserCheck from "./Icons/UserCheck";
import User from "./Icons/User";
import Brush from "./Icons/Brush";
import HelpCircle from "./Icons/HelpCircle";
import Settings from "./Icons/Settings";
import MessagePlusSquare from "./Icons/MessagePlusSquare";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import Close from "./Icons/Close";
import Image from "next/image";
import Lock from "./Icons/Lock";
import File from "./Icons/File";
import Button from "./Buttons/Button";
import LogOut from "./Icons/LogOut";
import { UserImage } from "./VideoComponent";

interface NavigationItem {
    name: string;
    path?: string;
    icon: (className: string) => JSX.Element;
    current: boolean;
  }

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

interface SidebarProps {
    isOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    closeSidebar?: boolean;
  }

  export default function Sidebar({ isOpen, setSidebarOpen, closeSidebar,}: SidebarProps) {

    const router = useRouter();
    const { data: sessionData } = useSession();
    const userId = sessionData?.user.id;
  
    const DesktopNavigation: NavigationItem[] = [
      {
        name: "Home",
        path: `/`,
        icon: (className) => <Home className={className} />,
        current: router.pathname === `/`,
      },
      {
        name: "Liked Videos",
        path: userId ? `/playlist/LikedVideos` : "sign-in",
        icon: (className) => <ThumbsUp className={className} />,
        current: router.pathname === `/playlist/LikedVideos`,
      },
      {
        name: "History",
        path: userId ? `/playlist/History` : "sign-in",
        icon: (className) => <ClockRewind className={className} />,
        current: router.pathname === `/playlist/History`,
      },
      {
        name: "Your Videos",
        path: userId ? `/${String(userId)}/ProfileVideos` : "sign-in",
        icon: (className) => <VideoRecorder className={className} />,
        current: router.asPath === `/${String(userId)}/ProfileVideos`,
      },
      {
        name: "Library",
        path: userId ? `/${String(userId)}/ProfilePlaylists` : "sign-in",
        icon: (className) => <Folder className={className} />,
        current: router.asPath === `/${String(userId)}/ProfilePlaylists`,
      },
      {
        name: "Subscriptions",
        path: userId ? `/${String(userId)}/ProfileFollowing` : "sign-in",
        icon: (className) => <UserCheck className={className} />,
        current: router.asPath === `/${String(userId)}/ProfileFollowing`,
      },
    ];
    const SignedInMobileNavigation: NavigationItem[] = [
      {
        name: "Profile",
        path: `/${String(userId)}/ProfileVideos`,
        icon: (className) => <User className={className} />,
        current: router.pathname === `/Profile`,
      },
      {
        name: "Creator Studio",
        path: `/Dashboard`,
        icon: (className) => <Brush className={className} />,
        current: router.pathname === `/CreatorStudio`,
      },
      {
        name: "Help",
        path: `/Blog/Help`,
        icon: (className) => <HelpCircle className={className} />,
        current: router.pathname === `/Blog/Help`,
      },
      {
        name: "Settings",
        path: `/Settings`,
        icon: (className) => <Settings className={className} />,
        current: router.pathname === `/Settings`,
      },
    ];
    const SignedOutMobileNavigation: NavigationItem[] = [
      {
        name: "Help",
        path: `/Blog/Help`,
        icon: (className) => <HelpCircle className={className} />,
        current: router.pathname === `/Blog/Help`,
      },
    ];
  
    const mobileNavigation = sessionData
      ? SignedInMobileNavigation
      : SignedOutMobileNavigation;
  
    useEffect(() => {
      DesktopNavigation.forEach((nav) => {
        nav.current = nav.path === router.pathname;
      });
      mobileNavigation.forEach((nav) => {
        nav.current = nav.path === router.pathname;
      });
    }, [router.pathname]);

    return (
        <>
         <div className={classNames(
          closeSidebar ? "lg:w-20" : "lg:w-56",
          "bottom-0 top-16  hidden lg:fixed lg:z-40 lg:flex lg:flex-col"
           )}>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border border-neutral-700 px-6 pb-4">
            <nav className="flex flex-1 flex-col pt-8">
                <ul role="list" className="-mx-2 space-y-1 ">
                {DesktopNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.path === "sign-in") {
                            void signIn();
                          } else {
                            void router.push(item.path || "/");
                          }
                        }}
                        className={classNames(
                          item.current
                            ? " bg-neutral-700 text-neutral-100"
                            : " text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        {item.current
                          ? item.icon("h-5 w-5 shrink-0 stroke-neutral-100")
                          : item.icon(
                              "h-5 w-5 shrink-0  stroke-neutral-300  group-hover:white"
                            )}
                        <p className={classNames(closeSidebar ? "hidden" : "")}>
                          {item.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="mt-auto">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    {
                      sessionData
                        ? void router.push("/Settings")
                        : void signIn();
                    }
                  }}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100"
                >
                  <Settings
                    className={
                      "h-5 w-5 shrink-0 stroke-neutral-300 group-hover:stroke-neutral-100"
                    }
                  />
                  <p className={classNames(closeSidebar ? "hidden" : "")}>
                    Settings
                  </p>
                </Link>
                <Link
                  href="/Blog/Help"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-700"
                >
                  <HelpCircle
                    className={
                      "h-5 w-5 shrink-0 stroke-neutral-300 group-hover:stroke-neutral-100"
                    }
                  />
                  <p className={classNames(closeSidebar ? "hidden" : "")}>
                    Help
                  </p>
                </Link>
                </ul>
            </nav>
          </div>
         </div>
          {/* Static sidebar for Mobile Animation */}
          <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}>
              <Transition.Child as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
                 <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>
              <div className="fixed inset-0 flex">
               <Transition.Child  as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
                 <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                 <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>

                    <Close className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                  {/* Sidebar component FOR MOBILE*/}
                  <div className=" flex grow  flex-col gap-y-5 overflow-y-auto border-r border-neutral-700 bg-neutral-700  px-6 pb-4">
                   <nav className="flex flex-1 flex-col pt-4">
                     <ul role="list" className="flex flex-1 flex-col gap-y-4">
                       <Image src='/bgpanda.png' alt="logo" width={26} height={26}/>
                       <li className="border-t border-neutral-500">
                        <ul role="list" className="-mx-2 space-y-1 pt-3 ">
                        {mobileNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.path || "/"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  void router.push(item.path || "/");
                                }}
                                className={classNames(
                                  item.current
                                    ? " text-neutral-100"
                                    : " text-neutral-300 hover:text-neutral-100",
                                  "group flex gap-x-3 rounded-md px-2 py-1.5 text-sm font-semibold leading-6"
                                )}
                              >
                                {item.current
                                  ? item.icon(
                                      "h-5 w-5 shrink-0 stroke-neutral-100"
                                    )
                                  : item.icon(
                                      "h-5 w-5 shrink-0  stroke-neutral-300  group-hover:stroke-neutral-100"
                                    )}
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                       </li>
                       <li className="mt-auto border-b border-neutral-500">
                         <Link  href="/Blog/Privacy"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-neutral-300 hover:text-neutral-100">
                            <Lock
                            className={
                              "h-5 w-5 shrink-0 stroke-neutral-300 group-hover:stroke-neutral-100"
                            }
                          />
                          Privacy
                         </Link>
                         <Link href="/Blog/TOS"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-neutral-300 hover:text-neutral-100">
                           <File
                            className={
                              "h-5 w-5 shrink-0 stroke-neutral-300 group-hover:stroke-neutral-100"
                            }
                          />
                          Terms of Service
                         </Link>
                       </li>
                       {sessionData ? (
                        <div className="my-2 flex flex-row">
                          <div className="h-9 w-9">
                          <UserImage image={sessionData?.user.image || ""} />
                          </div>
                          <div className="ml-2 flex w-full flex-col justify-start truncate text-sm ">
                            <p className="font-semibold text-neutral-300">
                              {sessionData && (
                                <span>{sessionData.user?.name}</span>
                              )}
                            </p>
                            <p className=" text-neutral-300">
                              {sessionData && (
                                <span>{sessionData.user?.email}</span>
                              )}
                            </p>
                          </div>
                          <Button variant="tertiary-gray" href="#" size="lg">
                            <LogOut className="w-5 stroke-neutral-300" />
                          </Button>
                        </div>
                      ) : (
                        <li className="space-y-2">
                          <Button
                            variant="primary"
                            size="2xl"
                            className="w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              {
                                void signIn();
                              }
                            }}
                          >
                            {" "}
                            Sign Up
                          </Button>
                          <Button
                            variant="secondary-gray"
                            size="2xl"
                            className="w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              {
                                void signIn();
                              }
                            }}
                          >
                            {" "}
                            Log In
                          </Button>
                        </li>
                      )}
                     </ul>
                   </nav>
                  </div>
                 </Dialog.Panel>
               </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </>
    )
  }