import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineTrash } from "react-icons/hi2";
import PopUp from "../components/popUp/popUp";
import { GetONeDesignated } from "../redux/designated/designatedSlice";
const UserPage = () => {
  const location = useParams();
  const { id } = location;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectDesiganted, setSelectDesignated] = useState(null);
  const { salesInVoice } = useSelector((state) => state.designated);
  const [designatedUser, setDesignatedUser] = useState(null);
  useEffect(() => {
    dispatch(GetONeDesignated({ id }));
  }, [salesInVoice, id, dispatch]);
  useEffect(() => {
    setDesignatedUser(salesInVoice);
  }, [salesInVoice]);
  const deleteHandler = (designated) => {
    setIsOpen(true);
    setSelectDesignated(designated);
  };
  if (designatedUser) {
    return (
      <>
        {isOpen && (
          <PopUp designated={selectDesiganted} setIsOpen={setIsOpen} id={id} />
        )}
        <div className="container px-4 max-w-screen-xl mx-auto pt-20">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                نام : {designatedUser.designated.name}
              </h1>
              <h1 className="text-xl font-semibold">
                شماره :{designatedUser.designated.phone}
              </h1>
              <h1 className="text-xl font-semibold">
                پلاک :{designatedUser.designated.plate}
              </h1>
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
                            مانده حساب
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
                        {designatedUser.designated.salesInvoices.map((item) => {
                          return (
                            <tr
                              key={item.id}
                              className="bg-[#edddd4] border-b transition duration-300 ease-in-out hover:bg-gray-300"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-semibold">
                                {new Date(item.createdAt).toLocaleDateString(
                                  "fa"
                                )}
                              </td>
                              <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap font-semibold">
                                {Number(item.remaining).toLocaleString()} ريال
                              </td>
                              <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                {item.desc[0].title}...
                              </td>
                              <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                {item.remaining === 0 ? "تسویه شد" : "بدهکار"}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center gap-x-2">
                                <button>Edit</button>
                                <button
                                  onClick={() => deleteHandler(item)}
                                  className="text-lg text-slate-800 hover:text-rose-600"
                                >
                                  <HiOutlineTrash className="stroke-2" />
                                </button>
                              </td>
                              <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                <Link
                                  to={`/detail/${item.id}`}
                                  state={{ id: designatedUser.id }}
                                >
                                  مشاهده
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-2">
              <Link
                to={`/addUser?id=${designatedUser.id}`}
                className="p-2 rounded-md bg-[#197278] text-gray-100 hover:ring hover:ring-offset-2 hover:ring-[#197278] transition-all ease-in-out duration-500 text-sm "
              >
                اضافه کردن
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default UserPage;
