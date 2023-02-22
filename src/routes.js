import NotFoundPage from "./pages/404";
import AddUserPage from "./pages/AddUser";
import DetailPAge from "./pages/Detail";
import Homepage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignIn from "./pages/SignIn";
import UserPage from "./pages/userPage";

const routes = [
    {path : "/" , element : <Homepage/>},
    {path : "/addUser" , element : <AddUserPage/>},
    {path : "/userPage/:id" , element : <UserPage/>},
    {path : "/detail/:id" , element : <DetailPAge/>},
    {path : "/singup" , element : <SignIn/>},
    {path : "/login" , element : <LoginPage/>},
    {path : "/*" , element : <NotFoundPage/>},
];

export default routes;