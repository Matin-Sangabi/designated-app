import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineTrash,
  HiUser,
  HiRectangleGroup,
  HiCurrencyDollar,
  HiPencil,
  HiEye,
} from "react-icons/hi2";
import PopUp from "../components/popUp/popUp";
import { GetONeDesignated } from "../redux/designated/designatedSlice";

const UserPage = () => {
  const location = useParams();
  const { id } = location;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectDesiganted, setSelectDesignated] = useState(null);
  const { salesInVoice ,users} = useSelector((state) => state.designated);
  const [designatedUser, setDesignatedUser] = useState(null);

  useEffect(() => {
    dispatch(GetONeDesignated({ id , userName : users.userName}));
  }, [id, users,dispatch]);
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
        <div className="w-full flex flex-col overflow-hidden pt-44  md:pt-64 bg-gradient-to-r from-primary via-secondary to-secondary  relative  after:absolute after:top-[12rem] md:after:top-[11rem] after:bg-gray after:w-[297%] md:after:w-[138%] after:skew-y-[9deg] md:after:skew-y-[4deg]  after:p-28 after:left-0  before:bg-gray before:absolute before:top-[11rem] before:p-20 before:w-[16rem] md:before:w-[20rem] before:-skew-y-[27deg] md:before:-skew-y-[20deg] ">
          <div className="absolute top-14 right-4 left-4 md:right-20 xl:right-32 xl:top-10 2xl:right-56  container max-w-screen-lg">
            <div className="flex items-center justify-around lg:justify-start">
              <div className="flex  gap-x-2 md:gap-x-4">
                <span className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary text-silver flex items-center justify-center text-lg md:text-2xl">
                  <HiUser />
                </span>
                <div className="flex flex-col text-center text-silver gap-y-1 md:gap-y-2">
                  <h1 className="md:text-lg font-medium">
                    {designatedUser.designated.name}
                  </h1>
                  <span className="text-xs text-silver">
                    {designatedUser.designated.phone}
                  </span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-silver text-primary text-xs lg:hidden">
                {Number(designatedUser.designated.totalAccount).toLocaleString()}ريال
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-x-28 pt-3 xl:pt-8 px-4">
              <div className="flex items-center gap-x-2 justify-center">
                <span className="text-primary text-2xl block">
                  <HiCurrencyDollar />
                </span>
                <span className="text-xs block text-silver">
                {Number(designatedUser.designated.totalAccount).toLocaleString()}ريال
                </span>
              </div>
              <div className="flex items-center gap-x-2 justify-center">
                <span className="text-primary text-2xl block">
                  <HiRectangleGroup />
                </span>
                <span className="text-xs block text-silver">
                  {designatedUser.designated.plate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <PopUp
            designated={selectDesiganted}
            setDesignatedUser={setDesignatedUser}
            designatedUser
            setIsOpen={setIsOpen}
            id={id}
          />
        )}
        <div className="container px-4 max-w-screen-xl mx-auto ">
          {designatedUser.designated.salesInvoices ? (<div className="flex flex-col gap-y-6 ">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full rounded-lg">
                      <thead className="bg-gradient-to-t from-primary to-secondary text-white border-b">
                        <tr className="rounded-md">
                          <th
                            scope="col"
                            className="text-sm font-medium px-6 py-4 text-right rounded-tr-xl"
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
                            className="text-sm font-medium  px-6 py-4 text-right rounded-tl-xl"
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
                              className="bg-white border-b border-primary transition duration-300 ease-in-out  even:bg-silver odd:bg-white  "
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm  text-slate font-semibold">
                                {new Date(item.createdAt).toLocaleDateString(
                                  "fa"
                                )}
                              </td>
                              <td className="text-sm text-slate  px-6 py-4 whitespace-nowrap font-semibold">
                                {Number(item.remaining).toLocaleString()} ريال
                              </td>
                              <td className="text-sm text-slate font-normal px-6 py-4 whitespace-nowrap">
                                {item.desc[0].title}...
                              </td>
                              <td className="text-sm text-slate font-normal px-6 py-4 whitespace-nowrap">
                                {item.remaining === 0 ? "تسویه شد" : "بدهکار"}
                              </td>
                              <td className="text-sm text-slate font-light px-6 py-4 whitespace-nowrap flex items-center gap-x-2">
                                <button className="hover:text-green text-lg">
                                  <HiPencil />
                                </button>
                                <button
                                  onClick={() => deleteHandler(item)}
                                  className="text-lg hover:text-rose"
                                >
                                  <HiOutlineTrash className="stroke-2" />
                                </button>
                              </td>
                              <td className="text-xl hover:text-bubble-gum mx-auto text-slate text-center font-normal px-8 py-4 whitespace-nowrap">
                                <Link
                                  to={`/detail/${item.id}`}
                                  state={{ id: designatedUser.id }}
                                  className=""
                                >
                                  <HiEye />
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
            
          </div>) : <div className="text-center">چیزی برای نمایش وجود ندارد</div>}
          <div className="flex items-center justify-end px-8">
              <Link
                to={`/addUser?id=${designatedUser.id}`}
                className="p-2 rounded-md bg-primary text-white hover:ring hover:ring-offset-2 hover:ring-primary transition-all ease-in-out duration-500 text-sm "
              >
                اضافه کردن
              </Link>
            </div>
        </div>
      </>
    );
  }
};

export default UserPage;
