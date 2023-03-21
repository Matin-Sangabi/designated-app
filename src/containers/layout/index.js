import Header from "./header";

const Layout = ({ children }) => {
  return <>
    <Header />
    <div className="container max-w-screen-xl mx-auto pt-28 px-10 relative h-fit">
        {children}
    </div>
  </>;
};

export default Layout;
