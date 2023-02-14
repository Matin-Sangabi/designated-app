import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegisterInputs from "../components/Rejister/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/designated/designatedSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const inputs = [
  { name: "email", type: "text", persianName: "ایمیل" },
  { name: "password", type: "password", persianName: "رمز ورورد" },
];
const initialValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { users, users_error } = useSelector((state) => state.designated);
  useEffect(() => {
    if (users) {
      navigate("/");
    }
  }, [users, navigate]);
  const onSubmit = (values) => {
    dispatch(LoginUser({ values }));
    navigate(`/${redirect}`);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 pt-4 md:pt-0 md:col-span-5  md:h-screen flex items-center justify-center md:bg-transparent bg-white">
        <div className="relative">
          <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-primary  relative  "></div>
          <div className="absolute w-32 h-16 md:w-60 md:h-28 rounded-b-full -bottom-7 -left-10   bg-opacity-20 bg-gray  backdrop-blur-md"></div>
          
        </div>
      </div>
      <div className="col-span-12 pt-10 md:pt-0 md:col-span-7  h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-start md:w-[60%]">
          <div className=" flex flex-col gap-y-4 items-start">
            <h1 className="text-4xl font-semibold text-slate"> خوش برگشتی !</h1>
            <h4 className=" text-bubble-gum">
              خوش برگشتی ! لطفا فرم زیر را پر کنید
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
              ورود
            </button>
            {users_error && (
              <span className="animate-pulse text-rose-800 text-center pt-4 text-sm relative">
                {users_error.data}
              </span>
            )}
            <Link to={redirect === "addUser" ? '/signup?redirect=adduser' : '/signup'} className="text-sm text-bubble-gum">
              حساب کاربری ندارید ؟ 
              <span className="text-primary">ثبت نام</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
/**
 * <div className=" flex flex-col gap-y-4 items-start">
              <h1 className="text-4xl font-semibold text-slate">
                {" "}
                خوش برگشتی !
              </h1>
              <h4 className=" text-bubble-gum">
                خوش برگشتی ! لطفا فرم زیر را پر کنید
              </h4>
            </div>
 * <div>
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
            {users_error && (
              <span className="animate-pulse text-rose-800 text-center pt-4 text-sm relative">
                {users_error.response.data}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
 */
