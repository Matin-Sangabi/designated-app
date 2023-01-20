import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import RegisterInputs from "../components/Rejister/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/designated/designatedSlice";
import { useEffect } from "react";
const inputs = [
  { name: "email", type: "text", placeholder: "ایمیل" },
  { name: "password", type: "password", placeholder: "رمز ورورد" },
];
const initialValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, users_loading, users_error } = useSelector(
    (state) => state.designated
  );

  const onSubmit = (values) => {
    dispatch(LoginUser({ values }));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  
  console.log(users , users_error , users_loading);
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-gray-100 rounded-md ring-2 shadow-lg p-2 ring-gray-500">
          <form
            className="flex items-center flex-col gap-y-4"
            onSubmit={formik.handleSubmit}
          >
            {inputs.map((item, i) => {
              return <RegisterInputs key={i} {...item} formik={formik} />;
            })}
            <button
              type="submit"
              className="p-2 rounded-md bg-[#198278] text-gray-100 hover:ring hover:ring-[#198278] hover:ring-offset-2 transition-all ease-in-out duration-300"
            >
              ثبت نام{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
