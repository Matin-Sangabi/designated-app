import { HiTrash, HiWrench, HiSwatch } from "react-icons/hi2";
import Link from "next/link";
const CustomerTable = ({ customer }) => {
  return (
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
            <th scope="col" className="px-6 py-3">
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
                  {Number(1200000).toLocaleString()} ريال
                </td>
                <td className="px-6  text-xs md:text-sm text-slate-800">
                  {Number(1200000).toLocaleString()} ريال
                </td>
                <td className="px-6  text-xs md:text-sm text-slate-800">
                  {Number(1200000).toLocaleString()} ريال
                </td>
                <td className="px-6 py-4 flex items-center gap-x-2  text-slate-800">
                  <button className="text-lg hover:text-rose-600 ">
                    <HiTrash />
                  </button>
                  <button className="text-lg hover:text-blue-600">
                    <HiWrench />
                  </button>
                </td>
                <td className="px-6 py-4  text-slate-800 text-center">
                  <Link href={"/"} className="text-xl hover:text-cyan-900">
                    <HiSwatch />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
