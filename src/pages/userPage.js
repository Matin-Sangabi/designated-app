import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UserPage = () => {
  const location = useParams();
  const { id } = location;
  const { designated } = useSelector((state) => state.designated);
  const [designatedUser, setDesignatedUser] = useState(null);
  useEffect(() => {
    const findUser = designated.find((u) => u.id === parseInt(id));
    setDesignatedUser(findUser);
  }, [id, designated]);
  if(designatedUser) {
    return (
      <div className="container px-4 max-w-screen-xl mx-auto pt-20">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">نام : {designatedUser.name}</h1>
            <h1 className="text-xl font-semibold">شماره :{designatedUser.phone}</h1>
            <h1 className="text-xl font-semibold">پلاک :{designatedUser.plate}</h1>
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
                        <th
                          scope="col"
                          className="text-sm font-medium  px-6 py-4 text-right"
                        >
                          نمایش
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#edddd4] border-b transition duration-300 ease-in-out hover:bg-gray-300">
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-semibold">
                          {new Date(designatedUser.createdAt).toLocaleDateString("fa")}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap font-semibold">
                          {Number(designatedUser.remaining).toLocaleString()} ريال
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          {designatedUser.desc[0].title}...
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          {designatedUser.remaining === 0 ? 'تسویه شد' : 'بدهکار'}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center gap-x-2">
                          <button>Edit</button>
                          <button>Delete</button>
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          <Link to="/detail">مشاهده</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end px-2">
            <Link
              to="AddUser"
              className="p-2 rounded-md bg-[#197278] text-gray-100 hover:ring hover:ring-offset-2 hover:ring-[#197278] transition-all ease-in-out duration-500 text-sm "
            >
              اضافه کردن
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default UserPage;
