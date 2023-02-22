import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import RegisterInputs from "../components/Rejister/inputs";
import { registerUser } from "../redux/designated/designatedSlice";

const inputs = [
  {
    name: "name",
    type: "text",
    persianName: "نام",
    placeholder: "نام خود را وارد کنید",
  },
  {
    name: "userName",
    type: "text",
    persianName: "نام کاربری",
    placeholder: "یک نام کاربری را وارد کنید ",
  },
  {
    name: "email",
    type: "email",
    persianName: "ایمیل",
    placeholder: "ایمیل خود را وارد کنید",
  },
  {
    name: "password",
    type: "password",
    persianName: " رمز ",
    placeholder: "رمز عبور را وارد کنید ",
  },
];
const initialValues = {
  name: "",
  userName: "",
  email: "",
  password: "",
};
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { users_error, users } = useSelector((state) => state.designated);
  useEffect(() => {
    if (users) {
      navigate("/");
    }
  }, [users, navigate]);
  const onSubmit = (values) => {
    dispatch(registerUser({ values }));
    navigate(`/${redirect}`);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-12 pt-4 md:pt-0 md:col-span-5  md:bg-transparent bg-white">
        <div className="w-full md:h-4/5 flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-primary  relative  "></div>
            <div className="absolute w-28 h-14 md:w-60 md:h-28 -bottom-2 -left-2 rounded-b-full md:-bottom-7 md:-left-10 bg-opacity-20 bg-gray  backdrop-blur-md"></div>
          </div>
        </div>
      </div>
      <div className="col-span-12 pt-14 md:pt-0 md:col-span-7   max-h-screen bg-white flex md:items-center justify-center">
        <div className="flex flex-col items-start md:w-[60%]">
          <div className=" flex flex-col gap-y-4 items-start">
            <h1 className="text-4xl font-semibold text-slate">
              سلام ، دوست من
            </h1>
            <h4 className=" text-bubble-gum">
              از دیدن شما خوشحالم ! لطفا فرم زیر را پر کنید
            </h4>
          </div>
          <form
            className="flex items-center flex-col gap-y-4 pt-10 w-full"
            onSubmit={formik.handleSubmit}
          >
            {inputs.map((item, i) => {
              return <RegisterInputs key={i} {...item} formik={formik} />;
            })}
            <button
              type="submit"
              className="p-2  w-full rounded-md bg-primary text-silver hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all ease-in-out duration-300"
            >
              ثبت نام{" "}
            </button>
            {users_error && (
              <span className="animate-pulse text-rose-800 text-center pt-4 text-sm relative">
                {users_error.data}
              </span>
            )}
            <Link
              to={redirect === "adduser" ? "/login?redirect=adduser" : "/login"}
              className="text-sm text-bubble-gum"
            >
              در حال حاضر یک حساب کاربری دارید؟{" "}
              <span className="text-primary">وارد شوید</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
