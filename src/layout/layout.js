import Header from "../components/header/header";

const Layout = ({children}) => {
    return ( 
        <>
            <Header/>
            {children}
        </>
     );
}
 
export default Layout;