import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiHome,
  HiColorSwatch,
  HiCog,
  HiLibrary,
  HiPlus,
} from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
const routes = [
  { path: "/", icon: () => HiHome(), name: "خانه" },
  { path: "/users", icon: () => HiColorSwatch(), name: "مشتری ها" },
  { path: "/library", icon: () => HiLibrary(), name: "کتاب خانه" },
  { path: "/setting", icon: () => HiCog(), name: "تنظیمات" },
];
const Header = () => {
  const router = useRouter();
  return (
    <>
      <header className="fixed right-0 top-0 h-screen w-52 hidden md:flex items-center justify-center max-w-5">
        <div className="w-full h-full bg-slate-800 text-slate-100 flex flex-col justify-between">
          <div className="flex flex-col items-center gap-y-4">
            <div className="mt-10 flex flex-col items-center">
              <img src="/images/Logo.png" className="w-16" />
            </div>
            <ul className="flex flex-col  w-full gap-y-6 pt-10">
              {routes.map((route, i) => {
                return (
                  <Link
                    className="flex items-center gap-x-2 text-slate-100 hover:bg-slate-50 rounded-l-xl hover:text-slate-800 transition-all ease-in-out duration-300 p-2  "
                    key={i}
                    href={route.path}
                  >
                    <span className="text-2xl">{route.icon()}</span>
                    <span className="text-sm font-thin">{route.name}</span>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="text-xs text-center py-4">MB v.2</h1>
          </div>
        </div>
      </header>
      <div className="fixed top-0 left-0 p-2  border-b-[1px] -z-10 border-slate-400 w-full">
        <div className="container max-w-screen-xl mx-auto  flex items-center justify-between relative">
          <div className="flex-1 items-center flex">
            <div className="flex items-center relative w-full">
              <input
                type="text"
                className="py-1 px-2 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 text-slate-700 ring-1 ring-slate-500 w-full rounded-xl outline-none border-none placeholder:text-xs transition-all ease-in-out duration-300"
                placeholder="جستجو"
              />
              <span className="text-2xl text-slate-500 absolute left-2"><HiMagnifyingGlass/></span>
            </div>
          </div>
          <div className="flex-1 items-center flex justify-end">
            <div className="flex gap-x-2 items-center">
              <span className="text-sm text-slate-600">ماهر</span>
              <span className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
/**
 * <div className="flex flex-col gap-4 text-gray-700  bg-white shadow-xl py-4 px-2 h-[95%] rounded-xl justify-between items-center">

        <div className="mt-3">
          <img src="/images/Logo.png" alt="logo" className="w-12 h-full" />
        </div>
        <ul className="flex items-center -wf justify-center flex-col gap-y-4 relative text-gray-700">
          {routes.map((route, i) => {
            if (i === 2)
              return (
                <Link
                  key={i}
                  href={route.path}
                  className={`flex p-2 gap-x-2 text-2xl  rounded-full bg-purple-600 text-white hover:animate-spin `}
                >
                  <span>{route.icon()}</span>
                </Link>
              );
            return (
              <Link
                key={i}
                href={route.path}
                className={`${
                  i === (routes.length -1 ) && "hover:animate-spin"
                } flex relative w-full p-2 gap-x-2 text-2xl hover:text-violet-600 transition-all ease-in-out duration-300 ${
                  router.pathname === route.path
                    ? "text-violet-600"
                    : "text-gray-600"
                }`}
              >
                <span>{route.icon()}</span>
                {router.pathname === route.path && (
                  <span className="absolute -bottom-1 right-4 p-1 rounded-full bg-violet-600"></span>
                )}
              </Link>
            );
          })}
        </ul>
        <div className="text-xs font-semibold font-mono">Mb v.2</div>
      </div>
 */
