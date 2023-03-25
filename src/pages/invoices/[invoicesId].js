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
      <div className="max-w-screen-xl rounded-xl shadow-xl bg-white p-2 mt-5 relative">
        <InvoiceDesc customer={customer} date={salesInvoices.createdAt} />
        <InvoiceTable salesInvoices={salesInvoices} />
        <InvoicePayment
          salesInvoices={salesInvoices}
          onClick={paymentHandler}
        />
        <span className="absolute -left-[0.9rem] top-10 text-slate-700  bg-violet-200 rounded-r-md w-16  text-xs px-1 py-[3px] after:absolute after:bg-violet-200 after:left-[0.5px] after:-top-[4px] after:p-2 after:-skew-y-[30deg] after:-z-10">
          {salesInvoices.status}
        </span>
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
