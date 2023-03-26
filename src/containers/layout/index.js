import { useState } from "react";
import Header from "./header";

const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className={`container ${openMenu ? 'md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-screen-lg' :'md:max-w-screen-sm lg:max-w-screen-md xl:max-w-5xl 2xl:max-w-screen-xl '} mx-auto  transition-all ease-in-out delay-300 pt-20 px-4 md:px-10 lg:px-0 relative`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
