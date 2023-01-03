const DetailPAge = () => {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 rounded-md bg-[#197278] text-gray-100 py-2  px-2">
          <h1 className="text-2xl font-bold">سر رسید : </h1>
          <div className="flex items-center w-full justify-between pt-2">
            <h1 className="text-lg font-semibold">تاریخ :</h1>
            <h1 className="text-lg font-semibold">نام:</h1>
            <h1 className="text-lg font-semibold"> شماره:</h1>
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
          <div className="col-span-9 p-2">
            <p>نصب شارژ</p>
          </div>
          <div className="col-span-3">100,000,000ريال</div>
          <div className="col-span-9 p-2">
            <p>نصب شارژ</p>
          </div>
          <div className="col-span-3">200,000,000ريال</div>
          <div className="col-span-9 p-2">
            <p>نصب شارژ</p>
          </div>
          <div className="col-span-3">300,000,000ريال</div>
          <div className="col-span-9 p-2">
            <p>نصب شارژ</p>
          </div>
          <div className="col-span-3">400,000,000ريال</div>
        </div>
        <div className="flex flex-col pt-6 px-2 gap-y-4">
            <h1 className="font-semibold">جمع کل : 303,000,000ريال</h1>
            <div className="flex flex-col gap-y-3">
                <h1 className="font-semibold"> پرداختی : </h1>
                <div className="flex items-center gap-x-10">
                    <h2>100,000,000ريال</h2>
                    <h2>1402/02/02</h2>
                </div>
                <div className="flex items-center gap-x-10">
                    <h2>100,000,000ريال</h2>
                    <h2>1402/02/02</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    <input type="text" className="p-1 rounded-md bg-transparent ring-1 ring-gray-400" placeholder="پرداختتی"/>
                    <button type="button" className="p-1 rounded-md text-gray-100 bg-[#178278] text-sm">تایید</button>
                </div>
            </div>
            <h1 className="font-semibold">مبلغ بدهی : 100,000,000</h1>
        </div>
      </div>
    </div>
  );
};

export default DetailPAge;
