import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  GetONeDesignated,
  UpdateDesignated,
} from "../../redux/designated/designatedSlice";
import { format } from "../../utils/degitInputs";

const Detail = () => {
  const { state } = useLocation();

  const { id } = state;
  const location = useParams();
  const detailId = location.id;
  const { salesInVoice } = useSelector((state) => state.designated);
  const [salesInvoicesItem, setSalesInvoiceItem] = useState();
  const [designatedUser, setDesignatedUser] = useState();
  const [user, setUser] = useState();
  const [value, setValue] = useState("");
  const [TypeInput, setTypeInput] = useState("");
  const [maxLength, setMaxLength] = useState();
  const [remaining, setRemaining] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetONeDesignated({ id }));
  }, [id, dispatch]);
  useEffect(() => {
    if (salesInVoice !== undefined) {
      setSalesInvoiceItem(salesInVoice);
    }
  }, [salesInVoice]);
  useEffect(() => {
    if (salesInvoicesItem) {
      const findItem = salesInvoicesItem.designated.salesInvoices.find(
        (item) => item.id === detailId
      );
      setDesignatedUser(findItem);
      setRemaining(findItem.remain);
      if (findItem.totalPrice > 1) {
        const totalPriceLength = findItem.remaining
          .toLocaleString()
          .toString(10)
          .replace(/\D/g, "0")
          .split("")
          .map(Number);
        setMaxLength(totalPriceLength);
      }
    }
  } , [salesInvoicesItem , detailId])
  useEffect(() => {
    if (designatedUser) {
      const remain =
        designatedUser.remaining - Number(value.split(",").join(""));
      setRemaining(remain);
    }
  }, [designatedUser, value]);
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
    const sales = [...designatedUser.payment, payment];
    const des = { ...designatedUser, payment: sales, remaining };
    const filters = salesInvoicesItem.designated.salesInvoices.filter(
      (item) => item.id !== detailId
    );
    const array = [...filters, des];
    const designated = {
      ...salesInvoicesItem.designated,
      salesInvoices: array,
    };
    setSalesInvoiceItem({ id, designated });
    dispatch(UpdateDesignated({ id, designated }));
    setValue("");
  };
  if (salesInvoicesItem && designatedUser) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 rounded-md bg-[#197278] text-gray-100 py-2  px-2 print:text-gray-200 print:bg-gray-500">
          <h1 className="text-2xl font-bold">سر رسید :</h1>
          <div className="flex items-center w-full justify-between pt-2">
            <h1 className="text-lg font-semibold">
              تاریخ :{" "}
              {new Date(designatedUser.createdAt).toLocaleDateString("fa")}
            </h1>
            <h1 className="text-lg font-semibold">
              نام: {salesInvoicesItem.designated.name}
            </h1>
            <h1 className="text-lg font-semibold">
              {" "}
              شماره: {salesInvoicesItem.designated.phone}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold pt-4">شرح کار :</h1>
        </div>
        <div className="grid  grid-cols-12 items-center p-2 bg-[#edddd4] rounded-md text-gray-800 mt-4 print:bg-gray-500 print:text-gray-100">
          <div className="col-span-1 text-sm ">ردیف</div>
          <div className="col-span-8 p-2">
            <p>شرح کالا</p>
          </div>
          <div className="col-span-3">قیمت</div>
        </div>
        <div className="grid overflow-auto   grid-cols-12 items-center p-2 bg-gray-300 rounded-md text-gray-800 print:bg-gray-300  print:text-gray-900  ">
          {designatedUser.desc.map((item, i) => {
            return (
              <Fragment key={i}>
                <div className="col-span-1 p-2">{(i += 1)}</div>
                <div className="col-span-8 p-2 ">
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
          </div>
          <div className=" print:hidden flex items-center gap-x-2 relative">
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

          <h1 className="font-semibold">
            مبلغ بدهی : {Number(remaining).toLocaleString()}
            ريال
          </h1>
        </div>
        <div className="mt-36 px-4 hidden print:block ">
          <h1>مهر و امضاء : </h1>
        </div>
      </div>
    );
  }
};
export default Detail;
