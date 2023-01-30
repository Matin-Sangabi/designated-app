import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/layout";
import { GetDesignated } from "../redux/designated/designatedSlice";
const Homepage = () => {
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
        <div className="max-w-screen-xl mx-auto container relative h-[93vh] px-2 ">
          <div className="w-full flex items-center justify-between pt-10">
            <input
              type="search"
              placeholder="جستجو"
              className="p-2 rounded-md border-none outline-none ring-1 focus:ring-offset-2 ring-gray-500 transition-all ease-in-out duration-500"
            />
            <div className="p-2">مرتب سازی</div>
          </div>
          <div className="grid grid-cols-12 pt-6 gap-6">
            {designated &&
              designated.map((item) => {
                return (
                  <Link
                    to={`userPage/${item.id}`}
                    key={item.id}
                    className="relative col-span-12 md:col-span-6 py-4 px-3 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-[#197278] transition-all ease-in-out duration-300 bg-[#197278] rounded-md shadow-md gap-y-4 text-gray-200 flex flex-col"
                  >
                  <span className="absolute bg-opacity-20 bg-blue-100 w-14 h-14 rounded-full "></span>
                    <div className="flex flex-col  gap-y-2 justify-between">
                      <h1 className="font-semibold text-lg hover:text-[#edddd4] transition-all ease-in-out duration-300 ">
                        نام : {item.designated.name}
                      </h1>
                      <div className="flex items-center justify-between ">
                        <h1 className="font-semibold text-sm hover:text-[#edddd4] transition-all ease-in-out duration-300 ">
                          تلفن :{item.designated.phone}
                        </h1>
                        <h1 className="font-semibold text-sm hover:text-[#edddd4] transition-all ease-in-out duration-300 ">
                          شماره پلاک : {item.designated.plate}
                        </h1>
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
