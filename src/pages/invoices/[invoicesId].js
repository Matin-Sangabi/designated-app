import axios from "axios";
import { useState } from "react";
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
      <h1 className="text-slate-800 text-lg">فاکتور فروش</h1>
      <div className="max-w-screen-xl rounded-xl shadow-xl bg-white p-2 mt-5">
        {/* <div className="w-full py-[18px] bg-violet-500 flex items-center relative rounded-md ">
          <img
            src="/images/Logo.png"
            className="absolute right-[15%] bg-white px-4 rounded-xl "
          />
        </div> */}
        <InvoiceDesc customer={customer} date={salesInvoices.createdAt} />
        <InvoiceTable salesInvoices={salesInvoices} />
        <InvoicePayment
          salesInvoices={salesInvoices}
          onClick={paymentHandler}
        />
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
