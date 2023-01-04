import { useState } from "react";
import AddElement from "../components/AddUser/AddElement";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
// import uuid from "react-uuid"; 
const initialValues = {
  name: "",
  phone: "",
  plate: "",
  desc: [{ title: "", price: "" }],
};
const Element = [
  { name: "", price: "" },
  { name: "", price: "" },
];

const onSubmit = (values) => {
  console.log(values);
};
const AddUserPage = () => {
  const [children, setChildren] = useState(Element);
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  function generateElement() {
    const temp = [...children];
    temp.push(1);
    setChildren(temp);
  }

  return (
    <div className="container mx-auto max-w-screen-xl pt-10">
      <Link
        to="/"
        className="flex items-end justify-end mb-4 text-sm text-sky-500"
      >
        بازگشت به خانه
      </Link>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full p-4 rounded-md ring-2 ring-gray-500"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-x-2">
              نام :
              <input
                type="text"
                placeholder="نام"
                name="name"
                {...formik.getFieldProps("name")}
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
            <label className="flex items-center gap-x-2">
              تلفن :
              <input
                type="tel"
                placeholder="تلفن"
                name="phone"
                {...formik.getFieldProps("phone")}
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
            <label className="flex items-center gap-x-2">
              پلاک :
              <input
                type="text"
                placeholder="پلاک"
                name="plate"
                {...formik.getFieldProps("plate")}
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
          </div>
          <div className="">
            <label className="flex items-center gap-x-2">
              تاریخ :
              <span className="px-2 py-2 rounded-md bg-gray-100 w-48 text-center">
                {new Date().toLocaleDateString("fa")}
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-y-2 relative">
            <h1>شرح کار : </h1>
            {children.map((_, index) => (
              <AddElement key={index} index={index} formik={formik} name={'desc'}/>
            ))}
            <button
              type="button"
              onClick={generateElement}
              className="w-6 h-6 rounded-full bg-[#178278] text-gray-100 absolute left-0 -bottom-3"
            >
              +
            </button>
          </div>
          <div className="flex flex-col gap-y-4 pt-4">
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">جمع کل : </h1>
              <div className="p-2 block bg-gray-100 w-36 h-10 rounded-md">
                100,000,000 ريال
              </div>
            </div>
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">پرداختی : </h1>
              <input
                type="text"
                placeholder="پرداختی"
                className="p-1 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </div>
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">مانده : </h1>
              <div className="p-2 block bg-gray-100 w-36 h-10 rounded-md">
                100,000 ريال
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="p-1 pt-4 bg-[#178278] text-gray-100 rounded-md w-72 hover:ring hover:ring-[#178278] hover:ring-offset-2 transition-all ease-in-out duration-300"
          >
            افزودن
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
