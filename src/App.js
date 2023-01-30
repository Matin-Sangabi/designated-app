import { Routes, Route } from "react-router-dom";
import AddUserPage from "./pages/AddUser";
import Homepage from "./pages/Home";
import UserPage from "./pages/userPage";
import DetailPAge from "./pages/Detail";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SignIn from "./pages/SignIn";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Provider store={store}>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="addUser" element={<AddUserPage />} />
          <Route path="/userPage/:id" element={<UserPage />} />
          <Route path="/detail/:id" element={<DetailPAge />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/AddDesignated/:id" element={<AddDesignated />} /> */}
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
