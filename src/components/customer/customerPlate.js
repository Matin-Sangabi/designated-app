const CustomerPlate = ({ plate }) => {
  return (
    <div className="flex items-center gap-x-1 text-left">
      <span className="p-1 text-xs rounded-md w-10 ring-2 ring-violet-200 flex items-center justify-center order-4">
        {plate.ssn1}
      </span>
      <span className="p-1 text-xs rounded-md w-10 ring-2 ring-violet-200 flex items-center justify-center order-3 ">
        {plate.ssn2}
      </span>
      <span className="p-1 text-xs rounded-md w-10 ring-2 ring-violet-200 flex items-center justify-center order-2">
        {plate.ssn3}
      </span>
      <div className="relative p-1 text-xs  rounded-md w-10 ring-2 ring-violet-200 flex items-center justify-end order-1">
        <span className="absolute print:bg-slate-700 print:text-slate-100 text-[8px]  rounded-r-md flex items-center  bg-slate-700 text-slate-100 ring-2 ring-slate-700 top-0 right-0 h-full">
          ایران
        </span>
        <span className="text-left">{plate.ssn4}</span>
      </div>
    </div>
  );
};

export default CustomerPlate;
