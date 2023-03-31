import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomerName from "../../components/customer/customerName";
import CustomerPlate from "../../components/customer/customerPlate";
import CustomerTable from "../../components/customer/customerTable";
import Pagination from "../../components/pagination/pagination";
import Layout from "../../containers/layout";
const Customer = ({ customerList }) => {
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    setCustomer(customerList.docs);
  }, [customerList]);
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
        <h1 className="text-slate-800">فاکتور های مشتری</h1>
        <div className="mt-5 mb-5 md:mt-20 bg-white  rounded-xl shadow-2xl py-10 pb-20 px-2 relative">
          <div className="absolute right-0 -top-2 flex items-center gap-x-2 p-2 ">
            <CustomerName customer={customer} isSmall={true} />
          </div>
          <div className="flex flex-col items-start gap-y-3 xl:flex-row xl:items-center px-5 py-5  mt-5">
            <div className="flex items-center gap-x-2">
              <span className="text-sm">شماره تماس : </span>
              <span className="text-xs text-slate-600 font-semibold">
                {customer.phone}
              </span>
            </div>
            <div className="flex items-center gap-x-2 justify-center  flex-1">
              <h1 className="text-sm text-slate-800">شماره پلاک: </h1>
              <CustomerPlate plate={JSON.parse(customer.plate)} />
            </div>
            <div className="flex items-center gap-x-2 justify-center  flex-1">
              <h1 className="text-sm text-slate-800">مبلغ بدهی : </h1>
              <span className="text-slate-600  font-semibold text-xs">
                {Number(customer.remaining).toLocaleString()} ريال
              </span>
              <span className="absolute -left-[0.9rem] text-slate-700  bg-violet-200 rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-violet-200 after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">
                {customer.status}
              </span>
            </div>
          </div>
          <div className="w-full h-[40vh] mb-5 flex flex-col justify-between ">
            <CustomerTable onDelete={deleteHandler} customer={customer} />
            <div className="flex relative items-center justify-between">
              <Pagination
                customer={customerList}
                path={`/customer/${customer._id}`}
              />
              <div className="absolute left-2 bottom-1 ">
                <Link
                  href={`/addCustomer/${customer._id}`}
                  className="p-1 group  relative w-11 h-11 aspect-10  text-xs bg-violet-200 text-violet-700 rounded-full hover:shadow-md gap-x-2 transition-all ease-in-out duration-300 flex items-center justify-center"
                >
                  <img
                    src="/images/createOrder.png"
                    alt="createOrder"
                    className="w-full h-full"
                  />
                  <span
                    className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2  text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 text-xs  mx-auto"
                  >
                    افزودن فاکتور
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Customer;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const page = query.page ? query.page : 0;
  const { data } = await axios.get(
    `http://localhost:3000/api/designated/${query.customerId}?page=${page}`
  );
  const { customer: customerList } = data;
  return {
    props: {
      customerList,
    },
  };
}
