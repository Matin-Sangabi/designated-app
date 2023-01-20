import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/layout";
const Homepage = () => {
  const { designated , users} = useSelector((state) => state.designated);
  useEffect(() => {
    localStorage.setItem("DESIGNATED_USERS", JSON.stringify(users));
  }, [users]);
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
                  className="col-span-12 md:col-span-6 py-4 px-3 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-[#197278] transition-all ease-in-out duration-300 bg-[#197278] rounded-md shadow-md gap-y-4 text-gray-200 flex flex-col"
                >
                  <div className="flex items-center gap-x-2 justify-between">
                    <h1 className="font-semibold hover:text-[#edddd4] transition-all ease-in-out duration-300 ">
                      {" "}
                      نام : {item.name}
                    </h1>
                    <h1 className="font-semibold hover:text-[#edddd4] transition-all ease-in-out duration-300 ">
                      {" "}
                      تلفن :{item.phone}
                    </h1>
                    <h1 className="font-semibold hover:text-[#edddd4] transition-all ease-in-out duration-300 ">
                      {" "}
                      شماره پلاک : {item.plate}
                    </h1>
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
};

export default Homepage;
