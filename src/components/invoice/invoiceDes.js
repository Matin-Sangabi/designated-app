const InvoiceDesc = ({ customer, date }) => {

  return (
    <div className="flex items-center justify-between px-4 py-12">
      <div className="flex flex-col  gap-y-1 flex-1 text-slate-800">
        <h1 className="text-base lg:text-lg">فاکتور به : </h1>
        <h1 className=" text-base lg:text-lg">{customer.name}</h1>
        <h1 className="text-slate-600 text-sm">{customer.phone}</h1>
        <h1 className="text-slate-600 text-sm">{customer.plate}</h1>
      </div>
      <div className="flex flex-col gap-1 flex-1 justify-end">
        <div className="flex items-center justify-evenly text-slate-800 w-full">
          <h1 className="text-base lg:text-lg">فاکتور # :</h1>
          <h1 className="text-slate-600 text-sm">#1101</h1>
        </div>
        <div className="flex items-center justify-evenly text-slate-800 w-full">
          <h1 className="">تاریخ:</h1>
          <h1 className="text-slate-600 text-sm">
            {new Date(date).toLocaleDateString("fa")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDesc;
