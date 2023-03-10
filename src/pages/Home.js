import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/layout";
import { GetDesignated } from "../redux/designated/designatedSlice";
import {
  HiMagnifyingGlass,
  HiFunnel,
  HiPlus,
  HiDevicePhoneMobile,
  HiRectangleGroup,
  HiCurrencyDollar,
} from "react-icons/hi2";
const Homepage = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortedDesignated, setSortedDesignated] = useState([]);
  const { designated, users, designated_loading, designated_error } =
    useSelector((state) => state.designated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) {
      dispatch(GetDesignated({ userName: users.userName }));
    }
  }, [dispatch, users]);
  useEffect(() => {
    if (designated) {
      const searchItem = (result) => {
        const filters = result.filter((item) =>
          item.designated.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        return filters;
      };
      let result = designated;
      result = searchItem(result);
      setSortedDesignated(result);
    }
  }, [designated, searchValue]);

  useEffect(() => {
    localStorage.setItem("DESIGNATED_USERS", JSON.stringify(users));
  }, [users]);

 
  if (designated_error) {
    return <p>Error</p>;
  }
  console.log(designated_loading);
  return (
    <Layout>
      {designated_loading ? (
        <span className="animate-spin">
          <img src={require("./../assets/img/icon/icons8-settings.gif")} alt="loading" />
        </span>
      ) : (
        <div className="max-w-screen-xl mx-auto container relative h-[80vh] md:h-[89vh] px-2 pt-4 ">
          <div className="flex md:hidden items-center  overflow-hidden">
            <span
              className={`transition-all ease-in-out duration-300 z-10 text-primary ${
                searchBox ? "-translate-x-48" : "translate-x-0"
              }`}
              onClick={() => setSearchBox(!searchBox)}
            >
              <HiMagnifyingGlass className="stroke-2 text-xl" />
            </span>
            <input
              type="text"
              placeholder="??????????"
              className={`placeholder:text-xs p-1  outline-none text-slate focus:border-2 focus:border-primary  rounded-lg transition-all ease-in-out duration-300 z-0  ${
                searchBox ? "translate-y-0 " : "-translate-y-full"
              }`}
              value={searchValue}
              onInput={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="w-full hidden md:flex items-center gap-x-10 pt-10">
            <div className="flex relative">
              <input
                type="text"
                placeholder="??????????"
                className="p-1  text-slate placeholder:text-sm rounded-md border-none outline-none ring-1 focus:ring-2 focus:ring-offset-2 ring-primary transition-all ease-in-out duration-300"
                value={searchValue}
                onInput={(e) => setSearchValue(e.target.value)}
              />
              <span className="absolute left-2 top-[6px] text-primary stroke-2 text-xl">
                <HiMagnifyingGlass />
              </span>
            </div>
            <div className="p-2 cursor-pointer text-primary text-2xl flex items-center">
              <HiFunnel />
            </div>
          </div>
          <div className="grid grid-cols-12 pt-6 gap-6 px-2">
            {sortedDesignated.length ? (
              sortedDesignated.map((item) => {
                return (
                  <Link
                    to={`userPage/${item.id}`}
                    key={item.id}
                    className="relative pb-6 col-span-12 md:col-span-4 lg:col-span-3 py-4  px-3 gap-x-2 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-secondary transition-all ease-in-out duration-300 bg-white rounded-md shadow-xl gap-y-4 flex flex-col"
                  >
                    <div className=" flex flex-col  gap-y-4 justify-between">
                      <div className="flex items-center gap-x-4">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">
                          {item.designated.name.substring(0, 1)}
                        </span>
                        <h1 className="font-semibold text-slate hover:text-secondary transition-all ease-in-out duration-300 ">
                          {item.designated.name}
                        </h1>
                      </div>
                      <span className="absolute -left-[0.9rem] text-primary  bg-tahiti rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-tahiti after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">
                        {Number(item.designated.totalAccount) > 0
                          ? "????????????"
                          : "?????????? ???? "}
                      </span>
                      <div className="flex w-full items-center  px-2 justify-between ">
                        <div className="flex items-center gap-x-2">
                          <span className="block text-xl text-primary stroke-2">
                            <HiDevicePhoneMobile />
                          </span>
                          <span className="text-xs block">
                            {item.designated.phone}
                          </span>
                        </div>
                        <div className="flex items-center justify-center  gap-x-2">
                          <span className="block text-xl text-primary stroke-2">
                            <HiRectangleGroup />
                          </span>
                          <span className="text-xs block">
                            {item.designated.plate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4 px-2 ">
                        <span className="text-primary text-2xl">
                          <HiCurrencyDollar />
                        </span>
                        <span className="text-xs md:text-sm text-primary font-semibold">
                          {Number(
                            item.designated.totalAccount
                          ).toLocaleString()}
                          ????????
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center col-span-12 text-primary">
                ?????????? ???? ???????? ??????
              </div>
            )}
          </div>
          <div className="fixed md:absolute bottom-5 md:bottom-10 left-2">
            <Link
              to={users ? "/addUser" : "/login?redirect=addUser"}
              className="w-10 h-10 md:h-10 md:w-10 flex items-center justify-center text-xl text-white rounded-full bg-primary hover:ring hover:ring-primary hover:ring-offset-2 group transition-all ease-in-out duration-300"
            >
              <HiPlus className="text-2xl group-hover:rotate-90 transition-all ease-in-out duration-300" />
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Homepage;
/**
 *
 */
