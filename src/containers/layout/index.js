import Header from "./header";

const Layout = ({ children }) => {
  return <>
    <Header />
    <div className="container  mx-auto pt-20 px-4 md:px-10 max-w-screen-xl relative h-fit">
        {children}
    </div>
  </>;
};

export default Layout;
