import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { format } from "../../utils/formatNumber";
const CustomerDesc = () => {
  const [child, setChild] = useState([1]);
  const AddElementHandler = (e) => {
    e.preventDefault();
    const addElement = [...child];
    addElement.push(1);
    setChild(addElement);
  };
  const RemoveElementHandler = (e) => {
    e.preventDefault();
    const removeElement = [...child];
    removeElement.pop(1);
    setChild(removeElement);
  };

  return (
    <div className="flex flex-col gap relative">
      <div className="grid grid-cols-12 text-slate-700 mt-3 py-2 px-2 bg-violet-100 rounded-lg  ">
        <div className="col-span-1  text-sm font-semibold border-l border-slate-700 px-2 flex items-center justify-center ">
          #
        </div>
        <div className="col-span-7 md:col-span-9 px-2 text-xs border-l border-slate-700">
          شرح کالا
        </div>
        <div className="col-span-4 md:col-span-2 text-xs px-2 ">قیمت</div>
      </div>
      <CustomerDescInputs child={child} />
      <div className="flex absolute  left-2 -bottom-3 items-center gap-x-2">
        <button
          onClick={AddElementHandler}
          className=" w-6 h-6 text-sm rounded-full bg-violet-500 text-slate-200 flex items-center justify-center"
        >
          <HiPlus />
        </button>
        {child.length > 1 && (
          <button
            onClick={RemoveElementHandler}
            className=" w-6 h-6 text-sm rounded-full bg-violet-500 text-slate-200 flex items-center justify-center"
          >
            <HiMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerDesc;
const CustomerDescInputs = ({ child }) => {
  return child.map((item, index) => {
    return (
      <div
        key={index}
        className="grid  grid-cols-12 text-slate-700 mt-3 py-1 px-2 ring-1 ring-violet-200 rounded-lg items-center justify-center "
      >
        <div className="col-span-1 text-base border-l border-slate-700 px-2 flex items-center justify-center">
          1
        </div>
        <div className="col-span-7 md:col-span-9 px-2  border-l border-slate-700 flex items-center justify-center">
          <textarea
            type="text"
            placeholder="شرح کالا"
            className="placeholder:text-xs  resize-none h-6 max-h-20 py-1 text-sm md:text-base rounded-md border-none outline-none w-full text-slate-700 focus:ring-1 focus:ring-violet-200 transition-all ease-in-out duration-300 px-2 "
          />
        </div>
        <PriceHandler />
      </div>
    );
  });
};

const PriceHandler = () => {
  const [currency, setCurrency] = useState(false);

  const changeHandler = (e) => {
    e.target.value.length > 0 ? setCurrency(true) : setCurrency(false);
    format(e.target);
  };
  return (
    <div className="col-span-4 relative md:col-span-2 px-1 md:px-2 flex items-center justify-center ">
      <input
        type="text"
        placeholder="قیمت"
        onInput={changeHandler}
        className="placeholder:text-xs text-xs sm md:text-sm rounded-md border-none outline-none w-full text-slate-700 focus:ring-1 focus:ring-violet-200 transition-all ease-in-out duration-300 px-2 py-1"
      />
      {currency && (
        <span className="hidden md:block absolute left-2 text-xs">ريال</span>
      )}
    </div>
  );
};
