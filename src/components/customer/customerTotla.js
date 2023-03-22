import { useState } from "react";

const CustomerTotal = () => {
  const [currency, setCurrency] = useState(false);
  const changeHandler = (e) => {
    format(e.target);
    e.target.value.length > 0 ? setCurrency(true) : setCurrency(false);
  };
  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <div className="flex flex-col ">
        <span className="text-sm text-slate-600 p-2">جمع کل</span>
        <div className="py-1 px-2 flex items-center justify-between ring-1 ring-violet-200 rounded-md">
          <span className="text-slate-700 text-sm">
            {Number("12000000").toLocaleString()}
          </span>
          <span className="text-xs text-slate-700">ريال</span>
        </div>
      </div>
      <div className="flex flex-col relative ">
        <span className="text-sm text-slate-600 p-2">پرداختی</span>
        <input
          type="text"
          placeholder="پرداختی"
          onInput={changeHandler}
          className="placeholder:text-xs  focus:ring-2 focus:ring-offset-2 focus:ring-violet-200 transition-all ease-in-out duration-300 text-sm border-none outline-none ring-1 ring-violet-200 rounded-md py-1 px-2"
        />

        {currency && (
          <span className="absolute left-2 bottom-1 text-xs">ريال</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-slate-600 p-2">جمع کل</span>
        <div className="py-1 px-2 flex items-center justify-between ring-1 ring-violet-200 rounded-md">
          <span className="text-slate-700 text-sm">
            {Number("12000000").toLocaleString()}
          </span>
          <span className="text-xs text-slate-700">ريال</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerTotal;
