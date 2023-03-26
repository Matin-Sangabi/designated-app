import { useEffect, useState } from "react";
import { format } from "../../utils/formatNumber";

const InvoicePayment = ({ salesInvoices, onClick }) => {
  const [currency, setCurrency] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const [payment, setPayment] = useState("");
  const [remaining, setRemaining] = useState(salesInvoices.remaining);
  const changeHandler = (e) => {
    format(e.target);
    if (Number(e.target.value.split(",").join("") > salesInvoices.remaining)) {
      format(e.target);
      setPayment(e.target.value);
    }
    e.target.value.length > 0 ? setCurrency(true) : setCurrency(false);
  };
  const keyupHandler = (e) => {
    remainHandle(e);
  };
  const remainHandle = (e) => {
    if (Number(e.target.value.split(",").join("") > salesInvoices.remaining)) {
      let position = e.target.selectionStart;
      e.target.value =
        e.target.value.substring(0, position - 1) +
        e.target.value.substring(position + 1);
      format(e.target);
      setPayment(e.target.value);
    }
  };
  useEffect(() => {
    setRemaining(salesInvoices.remaining);
    if (salesInvoices.remaining > 1) {
      const totalPriceLength = salesInvoices.remaining
        .toLocaleString()
        .toString(10)
        .replace(/\D/g, "0")
        .split("")
        .map(Number);
      setMaxLength(totalPriceLength);
      if (Number(payment.split(",").join("")) <= salesInvoices.remaining) {
        const remain =
          salesInvoices.remaining - Number(payment.split(",").join(""));
        setRemaining(remain);
      }
    }
  }, [payment, salesInvoices]);
  return (
    <div className="flex  flex-col pt-4 gap-4 py-5">
      <div className="flex items-center gap-2">
        <h1 className="text-slate-800 ">جمع کل : </h1>
        <span className="text-slate-600 text-sm">
          {Number(salesInvoices.totalPrice).toLocaleString()} ريال
        </span>
      </div>
      <h1 className="text-slate-700 text-sm">پرداختی ها</h1>
      <div className="grid grid-cols-12 gap-2 md:gap-4 justify-center ">
        {salesInvoices.payment[0] !== null ? (
          salesInvoices.payment.map((pay) => {
            return (
              <div
                key={pay._id}
                className="col-span-12   print:col-span-4 md:col-span-6 lg:col-span-4 xl:col-span-3  p-2 ring-2 shadow-lg bg-violet-50 ring-violet-200 rounded-lg  max-w-sm flex items-center px-2 justify-between flex-1"
              >
                <span className="text-slate-800 text-xs md:text-sm">
                  {pay.pay} ريال{" "}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(pay.createdAt).toLocaleDateString("fa")}
                </span>
              </div>
            );
          })
        ) : (
          <span className="col-span-12 md:col-span-4 text-sm font-semibold text-slate-700">
            پرداختی تا حالا نداشیتد !
          </span>
        )}
      </div>
      <div className="max-w-xs print:hidden">
        <h1>پرداختی جدید : </h1>
        <div className="flex  items-center  gap-x-2 pt-3">
          <div className="flex items-center gap-x-2 relative">
            <input
              type="text"
              maxLength={maxLength.length}
              placeholder="پرداختی"
              onInput={changeHandler}
              onKeyUp={keyupHandler}
              onChange={(e) => setPayment(e.target.value)}
              value={payment}
              disabled={salesInvoices.remaining === 0 ? true : false}
              className="placeholder:text-xs w-full disabled:bg-gray-300  focus:ring-2 focus:ring-offset-2 focus:ring-violet-200 transition-all ease-in-out duration-300 text-sm border-none outline-none ring-1 ring-violet-200 rounded-md py-1 px-2"
            />
            {currency && (
              <span className="absolute left-2 bottom-1 text-xs">ريال</span>
            )}
          </div>
          <button
            disabled={salesInvoices.remaining === 0 ? true : false}
            onClick={() => {
              onClick(salesInvoices._id, remaining, payment);
              setPayment("");
            }}
            className="p-2 text-xs bg-violet-300 text-gray-600 rounded-md disabled:bg-slate-300 disabled:text-slate-100 transition-all ease-in-out duration-300"
          >
            تایید
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-slate-800 ">باقی مانده : </h1>
        <span className="text-slate-600 text-sm">
          {Number(remaining).toLocaleString()} ريال
        </span>
      </div>
    </div>
  );
};

export default InvoicePayment;
