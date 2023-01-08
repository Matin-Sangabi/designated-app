import { useEffect, useState } from "react";
import AddElement from "../components/AddUser/AddElement";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import InputsTag from "../components/AddUser/Inputs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "../utils/degitInputs";
import { useDispatch } from "react-redux";
import { addDesignated } from "../redux/designated/designatedSlice";
// import uuid from "react-uuid";
const initialValues = {
  name: "",
  phone: "",
  plate: "",
  desc: [],
  payment: "",
};
const Element = [
  { name: "", price: "" },
  { name: "", price: "" },
];
const Inputs = [
  { name: "name", type: "text", placeholder: "نام" },
  { name: "phone", type: "tel", placeholder: "تلفن " },
  { name: "plate", type: "text", placeholder: "پلاک" },
];
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup.string().required("لطفا نام را وارد کنید"),
  phone: yup
    .string()
    .matches(phoneRegExp, "شماره تلفن صحیح نمی باشد")
    .required("شماره تلفن را وارد کنید"),
  plate: yup.string().required("شماره پلاک را وارد کنید"),
});

const AddUserPage = () => {
  const [children, setChildren] = useState(Element);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [typeInput, setTypeInput] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const designated = {
      createdAt: new Date().toISOString(),
      id: Date.now(),
      name: values.name,
      phone: values.phone,
      plate: values.plate,
      desc: values.desc,
      payment: [{ createdAt: new Date().toISOString(), pay: values.payment }],
      totalPrice,
      remaining,
    };
    dispatch(addDesignated(designated));
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  function generateElement() {
    const temp = [...children];
    temp.push(1);
    setChildren(temp);
  }
  const changeHandler = (e) => {
    format(e.target);
    if (Number(e.target.value.split(",").join("") > totalPrice)) {
      format(e.target);
      formik.values.payment = e.target.value;
    }
    e.target.value.length > 1 ? setTypeInput(true) : setTypeInput(false);
  };
  const keyHandler = (e) => {
    if (Number(e.target.value.split(",").join("") > totalPrice)) {
      let position = e.target.selectionStart;
      e.target.value =
        e.target.value.substring(0, position - 1) +
        e.target.value.substring(position + 1);
      format(e.target);
      formik.values.payment = e.target.value;
    }
  };
  useEffect(() => {
    const total = formik.values.desc.reduce((arc, curr) => {
      return curr.price && arc + Number(curr.price.split(",").join(""));
    }, 0);
    setTotalPrice(total);
    if (totalPrice > 1) {
      const totalPriceLength = totalPrice
        .toLocaleString()
        .toString(10)
        .replace(/\D/g, "0")
        .split("")
        .map(Number);
      setMaxLength(totalPriceLength);
      const remain =
        totalPrice - Number(formik.values.payment.split(",").join(""));
      setRemaining(remain);
    }
  }, [formik.values, totalPrice]);

  return (
    <div className="container mx-auto max-w-screen-xl pt-10 px-4">
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
            {Inputs.map((item, i) => {
              return <InputsTag key={i} {...item} formik={formik} />;
            })}
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
              <AddElement
                key={index}
                index={index}
                formik={formik}
                name={"desc"}
              />
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
              <div className="p-2 bg-gray-100 w-36 h-10 rounded-md flex items-center">
                {totalPrice === undefined ? (
                  <span className="text-[#197278] text-xl text-center">
                    <AiOutlineLoading3Quarters className=" animate-spin" />
                  </span>
                ) : (
                  `${Number(totalPrice).toLocaleString()} ريال`
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">پرداختی : </h1>
              <div className="relative">
                <input
                  type="text"
                  maxLength={maxLength.length}
                  {...formik.getFieldProps("payment")}
                  onInput={changeHandler}
                  onKeyUp={keyHandler}
                  placeholder="پرداختی"
                  className="p-1 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
                />
                {typeInput && (
                  <span className="absolute left-4 bottom-1">ريال</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">مانده : </h1>
              <div className="p-2 block bg-gray-100 w-36 h-10 rounded-md">
                {remaining === undefined ? (
                  <span className="text-[#197278] text-xl text-center">
                    <AiOutlineLoading3Quarters className=" animate-spin" />
                  </span>
                ) : (
                  `${Number(remaining).toLocaleString()} ريال`
                )}
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
