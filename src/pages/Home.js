import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/layout";
import { GetDesignated } from "../redux/designated/designatedSlice";
const Homepage = () => {
  const [searchBox, setSearchBox] = useState(false);
  const { designated, users, designated_loading, designated_error } =
    useSelector((state) => state.designated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDesignated());
    localStorage.setItem("DESIGNATED_USERS", JSON.stringify(users));
  }, [users, dispatch]);

  if (designated_loading) {
    return <p className="text-center">Loading...</p>;
  }
  if (designated_error) {
    return <p>Error</p>;
  }
  if (!designated_loading && !designated_error) {
    return (
      <Layout>
        <div className="max-w-screen-xl mx-auto container relative h-[93vh] px-2 pt-4 ">
          <div className="flex md:hidden   items-center md:hidfen overflow-hidden">
            <span
              className={`transition-all ease-in-out duration-300 z-10 ${
                searchBox ? "-translate-x-52" : "translate-x-0"
              }`}
              onClick={() => setSearchBox(!searchBox)}
            >
              search
            </span>
            <input
              type="text"
              placeholder="جستجو"
              className={`placeholder:text-xs p-1 rounded-lg transition-all ease-in-out duration-300 z-0 translate-x-9 ${
                searchBox ? "translate-y-0 " : "-translate-y-full"
              }`}
            />
          </div>
          <div className="w-full hidden md:flex items-center gap-x-10 pt-10">
            <input
              type="search"
              placeholder="جستجو"
              className="p-1 rounded-md border-none outline-none ring-1 focus:ring-offset-2 ring-gray-500 transition-all ease-in-out duration-500"
            />
            <div className="p-2 text-primary">فیلتر </div>
          </div>
          <div className="grid grid-cols-12 pt-6 gap-6 px-2">
            {designated &&
              designated.map((item) => {
                return (
                  <Link
                    to={`userPage/${item.id}`}
                    key={item.id}
                    className="relative pb-10 col-span-12 md:col-span-4 lg:col-span-3 py-4  px-3 gap-x-2 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-secondary transition-all ease-in-out duration-300 bg-white rounded-md shadow-xl gap-y-4 flex flex-col"
                  >
                    <div className=" flex flex-col  gap-y-4 justify-between">
                      <div className="flex items-center gap-x-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">{item.designated.name.substring(0 , 1)}</span>
                        <h1 className="font-semibold text-slate hover:text-secondary transition-all ease-in-out duration-300 ">
                          {item.designated.name}
                        </h1>
                      </div>
                      <span className="absolute -left-[0.9rem] text-primary  bg-tahiti rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-tahiti after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">بدهکار</span>
                      <div className="flex items-center px-2 justify-between ">
                        <h1 className="font-semibold text-xs hover:text-primary transition-all ease-in-out duration-300 ">
                          تلفن :{item.designated.phone}
                        </h1>
                        <h1 className="font-semibold text-xs hover:text-primary transition-all ease-in-out duration-300 ">
                          شماره پلاک : {item.designated.plate}
                        </h1>
                      </div>
                      <div className="flex px-2">
                        <span className="text-primary text-xs">بدهی : 150000ريال</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
          <div className="absolute bottom-10 left-2">
            <Link
              to="addUser"
              className="p-2 rounded-md bg-[#82AAE3] text-[#0A2647] font-semibold hover:ring hover:ring-offset-2 hover:ring-[#82aae3] transition-all ease-in-out duration-300 hover:text-gray-100"
            >
              اضافه کردن{" "}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Homepage;
