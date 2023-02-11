import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  GetONeDesignated,
  UpdateDesignated,
} from "../../redux/designated/designatedSlice";
import { format } from "../../utils/degitInputs";
import { HiUser, HiRectangleGroup, HiCalendar, HiPhone } from "react-icons/hi2";
const Detail = () => {
  const { state } = useLocation();

  const { id } = state;
  const location = useParams();
  const detailId = location.id;
  const { salesInVoice, users } = useSelector((state) => state.designated);
  const [salesInvoicesItem, setSalesInvoiceItem] = useState();
  const [designatedUser, setDesignatedUser] = useState();
  const [value, setValue] = useState("");
  const [TypeInput, setTypeInput] = useState("");
  const [maxLength, setMaxLength] = useState();
  const [remaining, setRemaining] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetONeDesignated({ id, userName: users.userName }));
  }, [id, users, dispatch]);
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
  }, [salesInvoicesItem, detailId]);
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
    const designatedItem = {
      ...salesInvoicesItem.designated,
      salesInvoices: array,
    };
    const totalAcc = designatedItem.salesInvoices.reduce((acc, curr) => {
      return acc + Number(curr.remaining);
    }, 0);
    const designated = { ...designatedItem, totalAccount: totalAcc };
    setSalesInvoiceItem({ id, designated });
    dispatch(UpdateDesignated({ id, designated, userName: users.userName }));
    setValue("");
  };
  if (salesInvoicesItem && designatedUser) {
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-12  bg-white rounded-lg shadow-md  max-w-screen-lg">
          <div className="col-span-6 md:col-span-3 flex gap-x-2 flex-1 rounded-md md:justify-center md:items-center py-4 px-2 md:hover:shadow-lg group  md:hover:shadow-primary  hover:bg-primary hover:text-silver text-slate transition-all ease-in-out duration-300">
            <span className="w-6 h-6 ring-1 ring-slate text- flex items-center justify-center rounded-md group-hover:ring-silver">
              <HiUser />
            </span>
            <h1 className="text-sm">{salesInvoicesItem.designated.name}</h1>
          </div>
          <div className="col-span-6 md:col-span-3 flex gap-x-2 flex-1 md:justify-center md:items-center py-4 px-2 md:hover:shadow-lg group md:hover:shadow-primary  hover:bg-primary hover:text-silver text-slate transition-all rounded-md  ease-in-out duration-300">
            <span className="w-6 h-6 ring-1 ring-slate text- flex items-center justify-center rounded-md group-hover:ring-silver">
              <HiRectangleGroup />
            </span>
            <h1 className="text-sm">{salesInvoicesItem.designated.plate}</h1>
          </div>
          <div className="col-span-6 md:col-span-3 flex gap-x-2 flex-1 md:justify-center md:items-center py-4 px-2 md:hover:shadow-lg group md:hover:shadow-primary  hover:bg-primary hover:text-silver rounded-md text-slate transition-all ease-in-out duration-300">
            <span className="w-6 h-6 ring-1 ring-slate text- flex items-center justify-center rounded-md group-hover:ring-silver">
              <HiPhone />
            </span>
            <h1 className="text-sm">{salesInvoicesItem.designated.phone}</h1>
          </div>
          <div className="col-span-6 md:col-span-3 flex gap-x-2 flex-1 md:justify-center md:items-center py-4 px-2 hover:shadow-lg group md:hover:shadow-primary rounded-md  hover:bg-primary hover:text-silver text-slate transition-all ease-in-out duration-300">
            <span className="w-6 h-6 ring-1 ring-slate text- flex items-center justify-center rounded-md group-hover:ring-silver">
              <HiCalendar />
            </span>
            <h1 className="text-sm">
              {" "}
              {new Date(designatedUser.createdAt).toLocaleDateString("fa")}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <h1 className="text-lg text-primary font-semibold pt-4">شرح کار :</h1>
        </div>
        <div className="grid  grid-cols-12 items-center p-2 bg-gradient-to-tr from-primary to-secondary text-silver rounded-t-md text-gray-800 mt-4 print:bg-gray-500 print:text-gray-100">
          <div className="col-span-1 text-sm ">ردیف</div>
          <div className="col-span-8 p-2">
            <p>شرح کالا</p>
          </div>
          <div className="col-span-3">قیمت</div>
        </div>
        <div className="grid overflow-auto text-slate   grid-cols-12 items-center p-2 bg-white shadow-md rounded-b-md text-gray-800 print:bg-gray-300  print:text-gray-900  ">
          {designatedUser.desc.map((item, i) => {
            return (
              <Fragment key={i}>
                <div className="col-span-1 p-2 ">{(i += 1)}</div>
                <div className="col-span-8 p-2 ">
                  <p>{item.title}</p>
                </div>
                <div className="col-span-3">{item.price}ريال</div>
              </Fragment>
            );
          })}
        </div>
        <div className="flex mb-8 flex-col pt-6 px-2 gap-y-4">
          <h1 className="font-semibold text-primary">
            جمع کل فاکتور :{" "}
            <span className="text-slate font-bold">
              {Number(designatedUser.totalPrice).toLocaleString()} ريال
            </span>
          </h1>

          <h1 className="font-semibold text-primary"> پرداختی : </h1>
          <div className=" print:hidden flex items-center gap-x-2 relative">
            <input
              type="text"
              value={value}
              maxLength={maxLength.length}
              onChange={changeHandler}
              onInput={inputHandler}
              onKeyUp={keyupHnadler}
              className="py-[6px] px-2 rounded-md bg-white ring-1 ring-primary"
              placeholder="پرداختتی"
            />
            {TypeInput && (
              <span className="absolute right-44 bottom-2 text-sm">ريال</span>
            )}
            <button
              type="button"
              onClick={paymentHandler}
              className="py-[6px] px-2 border-none outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-in-out duration-300 rounded-md text-gray-100 bg-primary text-white text-sm"
            >
              تایید
            </button>
          </div>
          <div className="max-w-screen-lg">
            <div className="grid grid-cols-12  gap-3 items-center">
              {designatedUser.payment.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 gap-x-10 p-2 bg-white rounded-md "
                  >
                    <h2>{item.pay}ريال</h2>
                    <h2 className="text-sm text-primary">
                      {new Date(item.createdAt).toLocaleDateString("fa")}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          <h1 className="font-semibold text-primary">
            مبلغ بدهی :{" "}
            <span className="text-slate">
              {Number(remaining).toLocaleString()} ريال
            </span>
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
