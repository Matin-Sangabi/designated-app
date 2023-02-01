import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineTrash,
  HiOutlineArrowLeft,
  HiUser,
  HiDevicePhoneMobile,
  HiRectangleGroup,
  HiCurrencyDollar
} from "react-icons/hi2";
import PopUp from "../components/popUp/popUp";
import { GetONeDesignated } from "../redux/designated/designatedSlice";
import Layout from "../layout/layout";
const UserPage = () => {
  const location = useParams();
  const { id } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectDesiganted, setSelectDesignated] = useState(null);
  const { salesInVoice } = useSelector((state) => state.designated);
  const [designatedUser, setDesignatedUser] = useState(null);
  useEffect(() => {
    dispatch(GetONeDesignated({ id }));
  }, [id, dispatch]);
  useEffect(() => {
    setDesignatedUser(salesInVoice);
  }, [salesInVoice]);
  const deleteHandler = (designated) => {
    setIsOpen(true);
    setSelectDesignated(designated);
  };
  if (designatedUser) {
    return (
      <Layout>
        {isOpen && (
          <PopUp designated={selectDesiganted} setIsOpen={setIsOpen} id={id} />
        )}
        <div className="container px-4 max-w-screen-xl mx-auto pt-10">
          <div className="flex items-center justify-end pt-4">
            <span
              className="text-primary text-xl block md:hidden"
              onClick={() => navigate("/")}
            >
              <HiOutlineArrowLeft />
            </span>
            <Link to={"/"} className="text-primary text-xs">
              بازکشت به خانه
            </Link>
          </div>
          <div className="flex flex-col gap-y-6 ">
            <div className="flex gap-4 md:gap-6 flex-col justify-between text-base border-b-2 py-6 border-primary">
              <div className="flex items-center gap-x-2">
                <span className="text-xl text-primary">
                  <HiUser />
                </span>
                <h1 className="font-semibold text-slate">
                  {designatedUser.designated.name}
                </h1>
              </div>
              <div className="flex items-center justify-between  md:gap-x-44 text-sm">
              
                <div className="flex items-center gap-x-2">
                  <span className="text-primary text-2xl block">
                    <HiDevicePhoneMobile />
                  </span>
                  <h1 className="font-semibold text-slate">
                    {designatedUser.designated.phone}
                  </h1>
                </div>
                
                <div className="flex items-center gap-x-2">
                  <span className="text-primary text-2xl flex">
                    <HiRectangleGroup />
                  </span>
                  <h1 className="font-semibold text-slate">
                    {designatedUser.designated.plate}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-primary text-2xl flex">
                    <HiCurrencyDollar />
                  </span>
                  <h1 className="font-semibold text-slate">
                    15000000 ريال
                  </h1>
                </div>
              </div>
            </div>
            {/* <hr className="bg-gray-600 h-[2px]" /> */}
            {/* <h1 className="text-2xl font-semibold text-secondary">لیست : </h1> */}

            <div className="flex flex-col pt-10">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-t from-primary to-secondary text-white border-b">
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
                              className="bg-white border-b border-primary transition duration-300 ease-in-out hover:bg-gray-300"
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
                className="p-2 rounded-md bg-primary text-white hover:ring hover:ring-offset-2 hover:ring-[#197278] transition-all ease-in-out duration-500 text-sm "
              >
                اضافه کردن
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default UserPage;
