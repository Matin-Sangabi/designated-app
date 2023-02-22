import { useEffect, useState } from "react";
import AddElement from "../components/AddUser/AddElement";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import InputsTag from "../components/AddUser/Inputs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "../utils/degitInputs";
import { useDispatch, useSelector } from "react-redux";
import { HiPlusSm } from "react-icons/hi";

import {
  AddDesignated,
  GetDesignated,
  GetONeDesignated,
  UpdateDesignated,
} from "../redux/designated/designatedSlice";
import uuid from "react-uuid";
import JalaliDatePicker from "../components/datepicker/DatePicker";

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
  const [date, setDate] = useState(new Date());
  const [userInitialValues, setUserInitalValues] = useState(null);
  const { salesInVoice, users } = useSelector((state) => state.designated);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      dispatch(GetONeDesignated({ id: userId , userName : users.userName }));
    }
  }, [userId, dispatch , users]);
  useEffect(() => {
    if (salesInVoice && userId) {
      const userInit = {
        name: salesInVoice.designated.name,
        phone: salesInVoice.designated.phone,
        plate: salesInVoice.designated.plate,
        desc: [],
        payment: "",
      };
      setUserInitalValues(userInit);
    }
  }, [salesInVoice, userId]);
  const initialValues = {
    name: "",
    phone: "",
    plate: "",
    desc: [],
    payment: "",
  };
  const onSubmit = (values) => {
    if (userId) {
      const salesInvoices = {
        id: uuid(),
        createdAt: date.toISOString(),
        desc: values.desc,
        payment: [{ createdAt: date.toISOString(), pay: values.payment }],
        totalPrice,
        remaining,
      };
      const sales = [...salesInVoice.designated.salesInvoices, salesInvoices];
      const salesInVoiceAdded = {
        ...salesInVoice.designated,
        salesInvoices: sales,
      };
      const totalAcc = salesInVoiceAdded.salesInvoices.reduce((acc, curr) => {
        return Number(acc) + Number(curr.remaining);
      }, 0);
      const designated = {
        ...salesInVoiceAdded,
        totalAccount: totalAcc,
      };
      
      dispatch(UpdateDesignated({ id: userId, designated , userName : users.userName }));
      navigate(-1);
    } else {
      const designated = {
        name: values.name,
        phone: values.phone,
        plate: values.plate,
        salesInvoices: [
          {
            id: uuid(),
            createdAt: date.toISOString(),
            desc: values.desc,
            payment: [{ createdAt: date.toISOString(), pay: values.payment }],
            totalPrice,
            remaining,
          },
        ],
        totalAccount: remaining,
      };
      const id = Date.now();
      dispatch(AddDesignated({ id, designated, userName: users.userName }));
      dispatch(GetDesignated());
      navigate(-1);
    }
  };
  const formik = useFormik({
    initialValues: userInitialValues ? userInitialValues : initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
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
    <>
      <header className="w-full hidden md:block px-4 xl:px-0 relative overflow-hidden  after:bg-gradient-to-b after:from-primary after:via-secondary after:to-metal md:after:right-[68%] lg:after:right-[55%] xl:after:right-[45%] 2xl:after:right-[45%] after:-z-10 md:after:-top-8 lg:after:top-0 md:after:-skew-y-[29deg]  md:after:p-44 after:w-[150%] after:fixed before:fixed before:bg-gradient-to-t from-primary before:via-secondary before:to-metal before:p-44 lg:before:bottom-0 md:before:-bottom-9  before:w-[150%] before:-skew-y-[29deg] 2xl:before:left-[50%]  xl:before:left-[55%] lg:before:left-[60%] md:before:left-[80%] before:-z-10"></header>
      <div className="container mx-auto max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl  xl:pt-20 py-10 xl:my-0  px-4">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full relative p-4 rounded-xl ring-2 ring-secondary "
        >
          <span className="absolute -top-3 right-10 bg-gray text-primary px-2">
            {userId ? "افزودن فاکتور" : "افزودن مشتری"}
          </span>
          <Link
            to="/"
            className="flex items-end justify-end mb-4 text-xs text-primary "
          >
            بازگشت به خانه
          </Link>
          <h1 className="text-primary">اطلاعات : </h1>
          <div className="flex flex-col gap-y-4 md:gap-y-6 pt-4">
            <div className="flex flex-col gap-4 md:flex-row flex-wrap md:items-center justify-between">
              {Inputs.map((item, i) => {
                return <InputsTag key={i} {...item} formik={formik} />;
              })}
            </div>
            <div className="">
              <label className="flex items-center gap-x-2">
                تاریخ :
                <JalaliDatePicker date={date} setDate={setDate} />
              </label>
            </div>
            <div className="flex flex-col gap-y-2 md:pt-4 relative  mb-4 ">
              <h1 className="text-primary">فاکتور: </h1>
              <div className="max-h-[300px] md:max-h-[230px]  overflow-auto">
                {children.map((_, index) => (
                  <AddElement
                    key={index}
                    index={index}
                    formik={formik}
                    name={"desc"}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={generateElement}
                className="w-8 h-8 text-xl  hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all ease-in-out duration-300 rounded-full bg-primary flex items-center justify-center text-white absolute left-6 -bottom-6"
              >
                <HiPlusSm />
              </button>
            </div>
            <h1 className="text-primary">صورت حساب :</h1>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2 ">
                <h1 className="font-semibold">جمع کل : </h1>
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
                <h1 className=" font-semibold">پرداختی : </h1>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={maxLength.length}
                    {...formik.getFieldProps("payment")}
                    onInput={changeHandler}
                    onKeyUp={keyHandler}
                    placeholder="پرداختی"
                    className="p-1 rounded-md w-44 bg-white focus:ring-2 focus:ring-primary focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
                  />
                  {typeInput && (
                    <span className="absolute left-4 bottom-1">ريال</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-x-2 ">
                <h1 className=" font-semibold">مانده : </h1>
                <div className="p-2 block bg-gra  y-100 w-36 h-10 rounded-md bg-white hover:ring hover:ring-offset-2 hover:ring-primary transition-all ease-in-out duration-300">
                  {remaining === undefined ? (
                    <span className="text-primary text-xl text-center">
                      <AiOutlineLoading3Quarters className=" animate-spin " />
                    </span>
                  ) : (
                    `${Number(remaining).toLocaleString()} ريال`
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="p-1 py-2 bg-primary text-gray-100 flex items-center justify-center   md:w-72 md:mx-auto rounded-lg  hover:ring-2 hover:ring-primary text-white hover:ring-offset-2 transition-all ease-in-out duration-300"
            >
              افزودن
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserPage;
