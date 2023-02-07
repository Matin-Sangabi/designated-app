import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiUser, HiBars3 } from "react-icons/hi2";

const Header = () => {
  const { users } = useSelector((state) => state.designated);
  return (
    <>
      <header className="py-4 print:hidden w-full block md:hidden px-2 bg-gradient-to-r from-primary via-secondary  to-secondary text-silver ">
        <div className="w-full space-y-5 ">
          <div className="flex items-center justify-between">
            <span className="text-2xl">
              <HiBars3 />
            </span>
            <Users users={users} />
          </div>
          
        </div>
        <div className="flex items-center gap-x-2 w-full  overflow-x-scroll pt-8 px-4">
            <div className="pl-8  flex-auto">
              <button to="addUser" className="block text-right py-2 border-b-2 border-silver text-silver w-32 text-base font-semibold" >اضافه کردن</button>
            </div>
            <div className="pl-8 flex-auto">
              <button to="addUser" className="block text-silver w-20 text-sm" >اضافه کردن</button>
            </div>
            <div className="pl-8 flex-auto">
              <button to="addUser" className="block text-silver w-20 text-sm" >اضافه کردن</button>
            </div>
            
          </div>
      </header>
      <header className="w-full hidden print:hidden md:block px-4 xl:px-0 relative overflow-hidden  after:bg-gradient-to-b after:from-primary after:via-secondary after:to-metal md:after:right-[68%] lg:after:right-[55%] xl:after:right-[40%] 2xl:after:right-[38%] after:-z-10 md:after:-top-8 lg:after:top-0 md:after:-skew-y-[29deg]  md:after:p-44 after:w-[150%] after:fixed before:fixed before:bg-gradient-to-t from-primary before:via-secondary before:to-metal before:p-44 lg:before:bottom-0 md:before:-bottom-9  before:w-[150%] before:-skew-y-[29deg] 2xl:before:left-[50%]  xl:before:left-[55%] lg:before:left-[60%] md:before:left-[80%] before:-z-10">
        <div className="max-w-screen-xl mt-4 top-8 bg-white p-4 rounded-md  shadow-md shadow-tahiti mx-auto xl:mx-auto flex items-center justify-between">
          <div className="px-2 flex gap-x-10 flex-1">
            <span>LOGO</span>
            <Link to="addUser">اضافه کردن</Link>
          </div>
          <div className="flex  items-center gap-x-2">
            <Users users={users} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const Users = ({ users }) => {
  return (
    <>
      {users.length !== 0 ? (
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-gray-500">{users.name}</span>
          <span className="w-6 h-6 rounded-full bg-silver flex items-center justify-center">
            <HiUser className="text-primary" />
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          {" "}
          <Link
            to="/SignIn"
            className="py-1 px-2 bg-primary text-silver rounded-md text-xs md:text-sm hover:ring-2 hover:ring-primary hover:ring-offset-2  hover:shadow-lg hover:shadow-primary transition-all ease-in-out duration-300"
          >
            ثبت نام
          </Link>
          <span className="">/</span>
          <Link
            to="/Login"
            className="text-xs md:text-sm p-1 hover:text-primary transition-all ease-in-out duration-300 hover:font-bold"
          >
            ورود
          </Link>
        </div>
      )}
    </>
  );
};
