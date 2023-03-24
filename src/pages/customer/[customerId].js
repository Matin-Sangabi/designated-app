import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomerName from "../../components/customer/customerName";
import CustomerTable from "../../components/customer/customerTable";
import Layout from "../../containers/layout";

const Customer = ({ customerList }) => {
  const [customer, setCustomer] = useState(customerList);
  const deleteHandler = async (id, saleId) => {
    const { data } = await axios.delete(
      `/api/designated/${id}?delete=${saleId}`
    );
    setCustomer(data.customer);
    toast.success(data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  if (customer) {
    return (
      <Layout>
        <h1 className="text-slate-800">صفحه مشتری</h1>
        <div className="mt-20 max-w-screen-xl rounded-xl shadow-2xl py-5 px-2 relative">
          <div className="absolute right-0 -top-2 flex items-center gap-x-2 p-2 ">
            <CustomerName customer={customer} isSmall={true} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center px-5 py-5  mt-5">
            <div className="flex items-center gap-x-2">
              <span className="text-sm">شماره تماس : </span>
              <span className="text-xs text-slate-600 font-semibold">
                {customer.phone}
              </span>
            </div>
            <div className="flex items-center gap-x-2 justify-center  flex-1">
              <h1 className="text-sm text-slate-800">مبلغ بدهی : </h1>
              <span className="text-slate-600  font-semibold text-xs">
                {Number(customer.remaining).toLocaleString()} ريال
              </span>
              <span className="absolute -left-[0.9rem] text-slate-700  bg-violet-200 rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-violet-200 after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">
                {customer.remaining > 0 ? "بدهکار" : "تسویه"}
              </span>
            </div>
          </div>
          <CustomerTable onDelete={deleteHandler} customer={customer} />
        </div>
      </Layout>
    );
  }
};

export default Customer;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { data } = await axios.get(
    `http://localhost:3000/api/designated/${query.customerId}`
  );
  const { customer: customerList } = data;
  return {
    props: {
      customerList,
    },
  };
}
/**
  * <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro "
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr>
  */
