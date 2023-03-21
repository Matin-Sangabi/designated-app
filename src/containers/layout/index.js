import Header from "./header";

const Layout = ({ children }) => {
  return <>
    <Header />
    <div className="container max-w-screen-xl mx-auto mt-5 relative">
        {children}
    </div>
  </>;
};

export default Layout;
