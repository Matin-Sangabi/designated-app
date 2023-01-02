const UserPage = () => {
  return (
    <div className="container max-w-screen-xl mx-auto pt-20">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">نام :</h1>
          <h1 className="text-xl font-semibold">شماره :</h1>
          <h1 className="text-xl font-semibold">پلاک :</h1>
        </div>
        <hr className="bg-gray-600 h-[2px]" />
        <h1 className="text-2xl font-semibold text-cyan-900">لیست : </h1>
        <div className="flex w-full justify-between items-center">
          <input
            type="search"
            placeholder="جستجو"
            className="px-2 py-1 bg-transparent rounded-md border-none outline-none ring-1 focus:ring-offset-2 ring-gray-500 transition-all ease-in-out duration-500"
          />
          <div className="p-2">مرتب سازی</div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-[#197278] text-gray-100 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-right"
                      >
                        تاریخ
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-right"
                      >
                        مبلغ
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-right"
                      >
                        شرح بابت
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-right"
                      >
                        وضعیت
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-right"
                      >
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#edddd4] border-b transition duration-300 ease-in-out hover:bg-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-semibold">
                        1401/02/02
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap font-semibold">
                        110,000,000 ريال
                      </td>
                      <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                        نصب شارژر صندلی ...
                      </td>
                      <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                        تسویه شد
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center gap-x-2">
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                    <tr className="bg-[#edddd4] border-b transition duration-300 ease-in-out hover:bg-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-semibold">
                        1401/02/02
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap font-semibold">
                        110,000,000 ريال
                      </td>
                      <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                        نصب شارژر صندلی ...
                      </td>
                      <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                        تسویه شد
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center gap-x-2">
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                    <tr className="bg-[#edddd4] border-b transition duration-300 ease-in-out hover:bg-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-semibold">
                        1401/02/02
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap font-semibold">
                        110,000,000 ريال
                      </td>
                      <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                        نصب شارژر صندلی ...
                      </td>
                      <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                        بدهکار
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center gap-x-2">
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
