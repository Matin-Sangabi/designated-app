import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { HiPrinter } from "react-icons/hi2";
import { toast } from "react-toastify";

import InvoiceDesc from "../../components/invoice/invoiceDes";
import InvoicePayment from "../../components/invoice/invoicePayment";
import InvoiceTable from "../../components/invoice/invoiceTable";
import Layout from "../../containers/layout";

const InvoiceId = ({ customerList, sales }) => {
  const [customer, setCustomer] = useState(customerList);
  const [salesInvoices, setSalesInvoices] = useState(sales);
  const paymentHandler = async (id, remain, payment) => {
    const { data } = await axios.put(
      `http://localhost:3000/api/designated/invoice/${customer._id}?invoice=${id}`,
      { remain, payment }
    );
    setCustomer(data.customer);
    setSalesInvoices(data.sales);
    toast.success(data.message, { position: toast.POSITION.TOP_CENTER });
  };
  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-between">
        <h1 className="text-slate-800 text-lg print:hidden">فاکتور فروش</h1>
        <div className="max-w-screen-xl rounded-xl shadow-xl  bg-white p-2 mt-5 print:mt-0 relative">
          <div className="max-w-screen-xl p-1 hidden print:flex rounded-md bg-violet-200 relative   items-start flex-col ">
            <img src="/images/Logo.png" className="object-cover" />
            <h1 className="text-slate-800 text-xs print:text-xs p-2">
              نمایندگی رسمی شرکت بهروش
            </h1>
          </div>
          <div className="flex items-center justify-between print:hidden">
            <button
              className="p-2 text-2xl text-slate-800 hover:text-violet-800 transition-all ease-in-out duration-300"
              onClick={() => window.print()}
            >
              <HiPrinter />
            </button>
            <Link
              href={"/"}
              className="text-xs text-blue-500 hover:underline hover:underline-offset-4 transition-all ease-in-out duration-300"
            >
              بازگشت به خانه
            </Link>
          </div>
          <InvoiceDesc customer={customer} date={salesInvoices.createdAt} />
          <InvoiceTable salesInvoices={salesInvoices} />
          <InvoicePayment
            salesInvoices={salesInvoices}
            onClick={paymentHandler}
          />
          <span className="absolute print:hidden -left-[0.9rem] top-10 text-slate-700  bg-violet-200 rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-violet-200 after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">
            {salesInvoices.status}
          </span>
        </div>
        <div className="flex-1 print:block hidden">
          <div className="flex items-center justify-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-800 text-sm">مهر و امضاء</h1>
              
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-slate-800">شماره کارت :</h1>
            <h1
              className="text-sm text-slate-600 "
              style={{ direction: "ltr" }}
            >
              6037 6975 3586 4216
            </h1>
            <h1 className="text-slate-600 text-sm">مسعود اسدسنگابی</h1>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-slate-800">شماره تماس :</h1>
            <h1
              className="text-sm text-slate-600 "
              style={{ direction: "ltr" }}
            >
              0917 318 4033
            </h1>
          </div>

          <h1 className="text-slate-800 text-sm">
            !مهم : لطفا بعد از واریزی وجه با شماره بالا هماهنگ کنید
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceId;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { data } = await axios.get(
    `http://localhost:3000/api/designated/invoice/${query.invoicesId}?invoice=${query.invoice}`
  );
  const { customer: customerList, salesInvoices: sales } = data;
  return {
    props: {
      customerList,
      sales,
    },
  };
}
