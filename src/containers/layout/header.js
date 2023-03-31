import Link from "next/link";
import {
  HiHome,
  HiColorSwatch,
  HiCog,
  HiLibrary,
  HiChevronDoubleRight,
  HiSearch,
} from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
const routes = [
  { path: "/", icon: () => HiHome(), name: "خانه" },
  { path: "/users", icon: () => HiColorSwatch(), name: "مشتری ها" },
  { path: "/library", icon: () => HiLibrary(), name: "کتاب خانه" },
  { path: "/setting", icon: () => HiCog(), name: "تنظیمات" },
];
const Header = ({ openMenu, setOpenMenu }) => {
  return (
    <>
      <header
        className={`fixed right-0 z-20 top-0 h-screen ${
          openMenu ? "md:w-32  xl:w-36 2xl:w-40" : "md:w-14 lg:w-16"
        } transition-all ease-in-out duration-300 hidden md:flex items-center justify-center max-w-5`}
      >
        <div className="w-full h-full bg-slate-800 text-slate-100 flex flex-col justify-between ">
          <div className="flex flex-col items-center gap-y-4">
            <div
              className={`mt-10 flex flex-col items-center w-14 transition-all ease-in-out delay-300`}
            >
              <img src="/images/Logo.png" />
            </div>
            <ListGroup openMenu={openMenu} />
          </div>
          <div className="relative flex-1 flex justify-center items-end">
            <div className="absolute -left-2 top-2">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className={`p-2 bg-white text-slate-700 rounded-full ring-2 ring-slate-600 flex items-center justify-center ${
                  openMenu ? "rotate-0" : "rotate-180"
                } transition-all ease-in-out delay-300`}
              >
                <HiChevronDoubleRight />
              </button>
            </div>
            <h1 className="text-xs text-center py-4">MB v.2</h1>
          </div>
        </div>
      </header>
      <div className="fixed print:hidden hidden md:block top-0 left-0 p-2  border-b-[1px] z-10  border-slate-400 w-full bg-gray-100">
        <div
          className={`container ${
            openMenu
              ? "md:max-w-md lg:max-w-2xl xl:max-w-4xl 2xl:max-w-screen-lg"
              : "md:max-w-screen-sm lg:max-w-screen-md xl:max-w-5xl 2xl:max-w-screen-xl "
          } mx-auto transition-all ease-in-out duration-300   flex items-center justify-between relative`}
        >
          <div className="flex-1 items-center flex">
            <div className="flex items-center relative w-full">
              <input
                type="text"
                className="py-1 px-2 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 text-slate-700 ring-1 ring-slate-500 w-full rounded-xl outline-none border-none placeholder:text-xs transition-all ease-in-out duration-300"
                placeholder="جستجو"
              />
              <span className="text-2xl text-slate-500 absolute left-2">
                <HiMagnifyingGlass />
              </span>
            </div>
          </div>
          <Profile />
        </div>
      </div>
      <div className="fixed top-0 z-50 left-0 bg-slate-800 py-4  w-full p-2 rounded-b-3xl flex flex-col gap-y-3` md:hidden">
        <div className="w-full flex items-center justify-between">
          <img src="/images/Logo.png" className="w-14 " />
          <Profile />
        </div>
        <div className="w-full relative mt-3 px-4">
          <input type="text" className="p-[3px] w-full px-7 rounded-lg bg-slate-600 text-sm placeholder:tex-xs placeholder:text-slate-400  outline-none focus:shadow-md focus:shadow-slate-500 transition-all ease-in-out duration-300 border-none text-slate-300" placeholder="جستجو ... " />
          <span className="absolute right-5 bottom-1 text-slate-200 text-xl stroke-2  "><HiMagnifyingGlass /></span>
        </div>
      </div>
      <div className="fixed bottom-0 md:hidden block left-0 p-2 w-full z-50">
        <div className="w-full p-2 bg-slate-800 rounded-xl">
          <ListGroup openMenu={false} />
        </div>
      </div>
    </>
  );
};

export default Header;

const Profile = () => {
  return (
    <div className="flex-1 items-center flex justify-end ">
      <div className="flex gap-x-2 items-center">
        <span className="text-sm  text-slate-200 md:text-slate-600">ماهر</span>
        <span className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center"></span>
      </div>
    </div>
  );
};
const ListGroup = ({ openMenu }) => {
  return (
    <ul
      style={{ direction: "ltr" }}
      className={`flex w-full  md:flex-col ${
        !openMenu ? " items-center" : ""
      } transition-all ease-in-out justify-between md:justify-start  delay-400 w-full gap-x-2 md:gap-y-6 md:pt-6`}
    >
      {routes.map((route, i) => {
        return (
          <Link
            className={`  text-slate-100 hover:bg-slate-50 ${
              openMenu
                ? "rounded-l-xl flex  items-center gap-x-2  whitespace-nowrap w-full"
                : "rounded-full "
            }  hover:text-slate-800 transition-all ease-in-out duration-300  p-2`}
            key={i}
            href={route.path}
          >
            <span className="text-2xl">{route.icon()}</span>
            <span className={`${openMenu ? "text-sm font-thin" : "hidden"}`}>
              {route.name}
            </span>
          </Link>
        );
      })}
    </ul>
  );
};
