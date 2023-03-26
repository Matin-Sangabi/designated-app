import Link from "next/link";
import { HiTrash } from "react-icons/hi";
import { HiWrench } from "react-icons/hi2";

const UserTable = ({ customers }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm  text-gray-500 text-right">
        <thead className="text-xs text-gray-700 uppercase bg-violet-200">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              نام
            </th>
            <th scope="col" className="px-6 py-3">
              شماره موبایل
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              شماره پلاک
            </th>
            <th scope="col" className="px-6 py-3">
              وضعیت
            </th>
            <th scope="col" className="px-6 py-3">
              عملیات
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">مشاهده</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr
                key={customer._id}
                className="bg-violet-50 border-b  text-slate-700 hover:bg-gray-100"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap flex items-center  "
                >
                    <span className="w-8 h-8 bg-violet-600 flex items-center justify-center text-xs rounded-full text-slate-50">{customer.name.charAt(0)}</span>
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  {customer.name}
                </th>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.plate}
                </td>
                <td className="px-6 py-4">{customer.status}</td>
                <td className="px-6 py-4 flex items-center gap-x-2">
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
                <td className="px-6 py-4 text-right">
                  <Link href={`/users/${customer._id}`}>مشاهده</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
