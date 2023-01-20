import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiUser } from "react-icons/hi2";
const Header = () => {
  const { users } = useSelector((state) => state.designated);
  return (
    <header className="w-full py-4 bg-gray-100 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="px-2 flex gap-x-10 flex-1">
          <span>LOGO</span>
          <Link to="addUser">اضافه کردن</Link>
        </div>
        <div className="flex  items-center gap-x-2">
          {users.length !== 0 ? (
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-gray-500">{users.name}</span>
              <span className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center"><HiUser className="text-slate-600"/></span>
            </div>
          ) : (
            <>
              {" "}
              <Link
                to="SignIn"
                className="p-1 bg-[#198278] text-gray-100 rounded-md text-sm hover:ring-2 hover:ring-[#198278] hover:ring-offset-2  hover:shadow-lg hover:shadow-[#198278] transition-all ease-in-out duration-300"
              >
                ثبت نام
              </Link>
              <span className="">/</span>
              <Link
                to="Login"
                className="text-sm p-1 hover:text-[#198278] transition-all ease-in-out duration-300 hover:font-bold"
              >
                ورود
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
