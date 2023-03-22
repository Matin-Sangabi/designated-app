import { useEffect, useState } from "react";
import { format } from "../../utils/formatNumber";

const CustomerTotal = ({ formik , remain , setRemain , totalPrice , setTotalPrice }) => {
  const [currency, setCurrency] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  useEffect(() => {
    const total = formik.values.desc.reduce((arr, curr) => {
      return curr.price && arr + Number(curr.price.split(",").join(""));
    }, 0);
    setTotalPrice(total);
  }, [formik.values.desc]);

  useEffect(() => {
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
      setRemain(remain);
    }
  }, [formik.values, totalPrice]);
  const changeHandler = (e) => {
    format(e.target);
    if (Number(e.target.value.split(",").join("") > totalPrice)) {
      format(e.target);
      formik.values.payment = e.target.value;
    }
    e.target.value.length > 0 ? setCurrency(true) : setCurrency(false);
  };
  const keyupHandler = (e) => {
    if (Number(e.target.value.split(",").join("") > totalPrice)) {
      let position = e.target.selectionStart;
      e.target.value =
        e.target.value.substring(0, position - 1) +
        e.target.value.substring(position + 1);
      format(e.target);
      formik.values.payment = e.target.value;
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <div className="flex flex-col ">
        <span className="text-sm text-slate-600 p-2">جمع کل</span>
        <div className="py-1 px-2 flex items-center justify-between ring-1 ring-violet-200 rounded-md">
          <span className="text-slate-700 text-sm">
            {totalPrice ? Number(totalPrice).toLocaleString() : "0"}
          </span>
          <span className="text-xs text-slate-700">ريال</span>
        </div>
      </div>
      <div className="flex flex-col relative ">
        <span className="text-sm text-slate-600 p-2">پرداختی</span>
        <input
          type="text"
          maxLength={maxLength.length}
          placeholder="پرداختی"
          onInput={changeHandler}
          onKeyUp={keyupHandler}
          {...formik.getFieldProps("payment")}
          disabled={totalPrice > 0 && totalPrice ? false : true}
          className="placeholder:text-xs disabled:bg-gray-300  focus:ring-2 focus:ring-offset-2 focus:ring-violet-200 transition-all ease-in-out duration-300 text-sm border-none outline-none ring-1 ring-violet-200 rounded-md py-1 px-2"
        />
        {currency && (
          <span className="absolute left-2 bottom-1 text-xs">ريال</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-slate-600 p-2">باقی مانده</span>
        <div className="py-1 px-2 flex items-center justify-between ring-1 ring-violet-200 rounded-md">
          <span className="text-slate-700 text-sm">
            {Number(remain).toLocaleString()}
          </span>
          <span className="text-xs text-slate-700">ريال</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerTotal;
