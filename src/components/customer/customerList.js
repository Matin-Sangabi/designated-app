import Link from "next/link";
import {
  HiCurrencyDollar,
  HiDevicePhoneMobile,
  HiRectangleGroup,
} from "react-icons/hi2";
import CustomerName from "./customerName";

const CustomerList = ({ customer }) => {
  return (
    <Link href={`/customer/${customer._id}`} className="relative pb-6 col-span-12 md:col-span-4 text-slate-700 lg:col-span-3 py-4  px-3 gap-x-2 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-violet-200 transition-all ease-in-out duration-300 bg-white rounded-md shadow-xl gap-y-4 flex flex-col">
      <div className=" flex flex-col  gap-y-4 justify-between">
        <CustomerName customer={customer} />
        <span className="absolute -left-[0.9rem] text-slate-700  bg-violet-200 rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-violet-200 after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">
          {customer.remaining > 0 ? "بدهکار" : "تسویه"}
        </span>
        <div className="flex w-full items-center  px-2 justify-between ">
          <div className="flex items-center gap-x-2">
            <span className="block text-xl  stroke-2">
              <HiDevicePhoneMobile />
            </span>
            <span className="text-xs block">{customer.phone}</span>
          </div>
          <div className="flex items-center justify-center  gap-x-2">
            <span className="block text-xl stroke-2">
              <HiRectangleGroup />
            </span>
            <span className="text-xs block">{customer.plate}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-4 px-2 ">
          <span className="text-primary text-xl">
            <HiCurrencyDollar />
          </span>
          <span className="text-xs md:text-sm text-primary font-semibold">
            {Number(customer.remaining).toLocaleString()}
            ريال
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CustomerList;
