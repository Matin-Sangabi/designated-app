import { HiTrash, HiWrench, HiSwatch } from "react-icons/hi2";
import { RiSlideshowLine } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const CustomerTable = ({ customer, onDelete }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const deleteHandler = (sale) => {
    if (sale.remaining !== 0) {
      toast.warning("شما نمیتوانید این آیتم را حذف کنید زیرا بدهکار میباشد", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setDeletePopup(true);
  };
  return (
    <>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full  text-sm text-right text-gray-500 ">
          <thead className="text-xs text-gray-600 uppercase bg-violet-100  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                تاریخ
              </th>
              <th scope="col" className="px-6 py-3">
                شرح کار
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت کل
              </th>
              <th scope="col" className="px-6 py-3">
                پرداختی
              </th>
              <th scope="col" className="px-6 py-3">
                باقی مانده
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                مشاهده
              </th>
            </tr>
          </thead>
          <tbody>
            {customer.salesInvoices.map((sale) => {
              return (
                <tr key={sale._id} className="bg-violet-50 border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-slate-800 text-xs md:text-sm whitespace-nowrap"
                  >
                    {new Date(sale.createdAt).toLocaleDateString("fa")}
                  </th>
                  <td className="px-6  text-slate-800">
                    {sale.desc[0].title} ...
                  </td>
                  <td className="px-6  text-xs md:text-sm text-slate-800">
                    {Number(sale.totalPrice).toLocaleString()} ريال
                  </td>
                  <td className="px-6  text-xs md:text-sm text-slate-800">
                    {sale.payment[sale.payment.length - 1].pay} ريال
                  </td>
                  <td className="px-6  text-xs md:text-sm text-slate-800">
                    {Number(sale.remaining).toLocaleString()} ريال
                  </td>
                  <td className="px-6 py-4 flex items-center gap-x-2  text-slate-800">
                    {deletePopup && (
                      <DeleteInvoice
                        sale={sale}
                        setDeletePopup={setDeletePopup}
                        deletePopup={deletePopup}
                        id={customer._id}
                        onDelete={onDelete}
                      />
                    )}
                    <button
                      onClick={() => deleteHandler(sale)}
                      className="text-lg text-slate-700 hover:text-rose-600 "
                    >
                      <HiTrash />
                    </button>
                    <button className="text-lg text-slate-700 hover:text-blue-600">
                      <HiWrench />
                    </button>
                  </td>
                  <td className="px-6 py-4  text-slate-700 text-center">
                    <Link
                      href={`/invoices/${customer._id}?invoice=${sale._id}`}
                      className="text-xl text-center mx-auto flex items-center justify-center  w-full  hover:text-cyan-900"
                    >
                      <RiSlideshowLine />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerTable;

const DeleteInvoice = ({ deletePopup, setDeletePopup, sale, id, onDelete }) => {
  if (deletePopup) {
    return (
      <div className="w-full h-screen bg-gray-600 bg-opacity-50 z-50 fixed top-0 left-0 flex items-center justify-center">
        <div className="flex px-2 py-4 bg-white rounded-lg shadow-xl flex-col gap-y-2">
          <h1 className="text-slate-800">
            {" "}
            آیا مطمئن هستید که میخواهید این مورد :
          </h1>
          <div className="flex items-center gap-x-2 text-slate-800">
            <h2 className="text-sm text-slate-700">شرح کار : </h2>
            <h2 className="text-xs text-slate-600">{sale.desc[0].title}</h2>
          </div>
          <div className="flex items-center gap-x-2 text-slate-800">
            <h2 className="text-sm text-slate-700"> قیمت کل : </h2>
            <h2 className="text-xs text-slate-600">
              {Number(sale.totalPrice).toLocaleString()} ريال
            </h2>
          </div>
          <div className="flex items-center gap-x-2 text-slate-800">
            <h2 className="text-sm text-slate-700">تاریخ</h2>
            <h2 className="text-xs text-slate-600">
              {new Date(sale.createdAt).toLocaleDateString("fa")}
            </h2>
          </div>
          <h1 className="text-slate-800"> را حذف کنید ؟</h1>
          <div className="flex items-center gap-x-2">
            <button
              onClick={() => {
                onDelete(id, sale._id);
                setDeletePopup(false);
              }}
              className="flex items-center justify-center gap-x-2 p-2 rounded-md flex-1 ring-2 ring-violet-400 hover:bg-violet-400 hover:text-slate-100 transition-all ease-in-out duration-300 "
            >
              <span>حذف کن</span>
              <HiTrash className="text-lg" />
            </button>
            <button
              onClick={() => setDeletePopup(false)}
              className="p-2 rounded-md flex-1 bg-violet-400 text-slate-100"
            >
              بیخیال
            </button>
          </div>
        </div>
      </div>
    );
  }
};
