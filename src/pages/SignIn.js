import { useFormik } from "formik";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterInputs from "../components/Rejister/inputs";
import { registerUser } from "../redux/designated/designatedSlice";

const inputs = [
  { name: "name", type: "text", placeholder: "نام" },
  { name: "email", type: "email", placeholder: "ایمیل" },
  { name: "password", type: "password", placeholder: "رمز" },
];
const initialValues = {
  name: "",
  email: "",
  password: "",
};
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users_error, users } = useSelector((state) => state.designated);
  useEffect(() => {
    if (users.length !== 0) {
      navigate("/");
    }
  }, [users, navigate]);
  const onSubmit = (values) => {
    dispatch(registerUser({ values }));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-md ring-2 shadow-lg p-4 ring-gray-500">
        <form
          className="flex items-center flex-col gap-y-4"
          onSubmit={formik.handleSubmit}
        >
          {inputs.map((item, i) => {
            return <RegisterInputs key={i} {...item} formik={formik} />;
          })}
          <button
            type="submit"
            className="p-2 w-full rounded-md bg-[#198278] text-gray-100 hover:ring hover:ring-[#198278] hover:ring-offset-2 transition-all ease-in-out duration-300"
          >
            ثبت نام{" "}
          </button>
          {users_error && (
            <span className="animate-pulse text-rose-800 text-center pt-4 text-sm relative">
              {users_error.data}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
