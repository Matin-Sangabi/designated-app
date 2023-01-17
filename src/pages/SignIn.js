import { useFormik } from "formik";
import RegisterInputs from "../components/Rejister/inputs";
import axios from "axios";
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
  const onSubmit = (values) => {
    axios
      .post("http://localhost/PHP_TRAINING/Designated-app/rejister.php" , values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
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
  );
};

export default SignIn;
