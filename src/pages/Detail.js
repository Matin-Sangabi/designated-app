import { Fragment, useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addDesignatedPayment } from "../redux/designated/designatedSlice";
import { format } from "../utils/degitInputs";

const DetailPAge = () => {
  const { state } = useLocation();
  const { designatedUser, id } = state;
  const [salesInvoices, setSalesInvoice] = useState(null);
  const [value, setValue] = useState("");
  const [TypeInput, setTypeInput] = useState("");
  const { designated } = useSelector((state) => state.designated);
  const [maxLength, setMaxLength] = useState();
  const [remaining, setRemaining] = useState(designatedUser.remaining);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('run');
    const findUser = designated.find((item) => item.id === parseInt(id));
    setSalesInvoice(findUser);
    
    if (designatedUser.totalPrice > 1) {
      const totalPriceLength = designatedUser.remaining
        .toLocaleString()
        .toString(10)
        .replace(/\D/g, "0")
        .split("")
        .map(Number);
      setMaxLength(totalPriceLength);
    }
  }, [id, designated, designatedUser]);
  
  useEffect(() => {
    const remain = designatedUser.remaining - Number(value.split(",").join(""));
    setRemaining(remain);
  }, [designatedUser.remaining, value]);
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  const inputHandler = (e) => {
    format(e.target);
    if (Number(e.target.value.split(",").join("") > designatedUser.remaining)) {
      format(e.target);
      setValue(e.target.value);
    }
    e.target.value.length > 1 ? setTypeInput(true) : setTypeInput(false);
  };
  const keyupHnadler = (e) => {
    if (Number(e.target.value.split(",").join("") > designatedUser.remaining)) {
      let position = e.target.selectionStart;
      e.target.value =
        e.target.value.substring(0, position - 1) +
        e.target.value.substring(position + 1);
      format(e.target);
      setValue(e.target.value);
    }
  };
  const paymentHandler = () => {
    const payment = { createdAt: new Date().toISOString(), pay: value };
    dispatch(addDesignatedPayment({id : salesInvoices.id , payment , factorId : designatedUser.id}))
  };
  console.log(salesInvoices , designatedUser);
  if (salesInvoices) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 pt-10">
        <div className="flex items-center justify-end pb-4">
          <Link to="/" className="text-sm px-6 text-sky-700">
            بازگشت به خانه{" "}
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 rounded-md bg-[#197278] text-gray-100 py-2  px-2">
            <h1 className="text-2xl font-bold">سر رسید : </h1>
            <div className="flex items-center w-full justify-between pt-2">
              <h1 className="text-lg font-semibold">
                تاریخ :{" "}
                {new Date(designatedUser.createdAt).toLocaleDateString("fa")}
              </h1>
              <h1 className="text-lg font-semibold">
                نام:{salesInvoices.name}
              </h1>
              <h1 className="text-lg font-semibold">
                {" "}
                شماره:{salesInvoices.phone}
              </h1>
            </div>
          </div>
          <h1 className="text-xl font-semibold pt-4">شرح کار :</h1>
          <div className="grid  grid-cols-12 items-center p-2 bg-[#edddd4] rounded-md text-gray-800 mt-4">
            <div className="col-span-9 p-2">
              <p>شرح کالا</p>
            </div>
            <div className="col-span-3">قیمت</div>
          </div>
          <div className="grid overflow-auto  grid-cols-12 items-center p-2 bg-gray-300 rounded-md text-gray-800 ">
            {designatedUser.desc.map((item, i) => {
              return (
                <Fragment key={i}>
                  <div className="col-span-9 p-2">
                    <p>{item.title}</p>
                  </div>
                  <div className="col-span-3">{item.price}ريال</div>
                </Fragment>
              );
            })}
          </div>
          <div className="flex flex-col pt-6 px-2 gap-y-4">
            <h1 className="font-semibold">
              جمع کل :{Number(designatedUser.totalPrice).toLocaleString()}ريال
            </h1>
            <div className="flex flex-col gap-y-3">
              <h1 className="font-semibold"> پرداختی : </h1>
              {designatedUser.payment.map((item, i) => {
                return (
                  <div key={i} className="flex items-center gap-x-10">
                    <h2>{item.pay}ريال</h2>
                    <h2>{new Date(item.createdAt).toLocaleDateString("fa")}</h2>
                  </div>
                );
              })}

              <div className="flex items-center gap-x-2 relative">
                <input
                  type="text"
                  value={value}
                  maxLength={maxLength.length}
                  onChange={changeHandler}
                  onInput={inputHandler}
                  onKeyUp={keyupHnadler}
                  className="p-1 rounded-md bg-transparent ring-1 ring-gray-400"
                  placeholder="پرداختتی"
                />
                {TypeInput && (
                  <span className="absolute right-40 bottom-1">ريال</span>
                )}
                <button
                  type="button"
                  onClick={paymentHandler}
                  className="p-1 rounded-md text-gray-100 bg-[#178278] text-sm"
                >
                  تایید
                </button>
              </div>
            </div>
            <h1 className="font-semibold">
              مبلغ بدهی : {Number(remaining).toLocaleString()}
              ريال
            </h1>
          </div>
        </div>
      </div>
    );
  }
};

export default DetailPAge;
