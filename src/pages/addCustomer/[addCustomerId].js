import axios from "axios";
import Layout from "../../containers/layout";
import { useState } from "react";
import CustomerDesc from "../../components/customer/customerDesc";
import CustomersInputs from "../../components/customer/customerForms";
import CustomerTotal from "../../components/customer/customerTotla";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CustomerDetail from "../../components/customer/customerDetail";
import CustomerPlate from "../../components/customer/customerPlate";
const initialValues = {
  desc: [],
  payment: "",
};
const AddCustomerId = ({ customer }) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [remain, setRemain] = useState(0);
  const onSubmit = async (values) => {
    const value = { ...values, totalPrice, remain };
    const { data } = await axios.post(
      `http://localhost:3000/api/designated/${customer._id}`,
      {
        value,
      }
    );
    toast.success(data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
    router.push(`/customer/${customer._id}`);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <Layout>
      <h1 className="text-lg text-slate-700 font-semibold p-2">افزودن مشتری</h1>
      <div className="pt-5 mx-auto  bg-white shadow-md rounded-xl px-2 py-4 mb-5">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-slate-800  ">مشخصات مشتری</h1>
          <div className="flex flex-col flex-wrap md:flex-row md:items-center p-2 text-slate-600 md:gap-x-8 gap-y-4">
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">نام مشتری</span>
              <CustomerDetail name={customer.name} />
            </label>
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">شماره پلاک</span>
              <CustomerPlate plate={JSON.parse(customer.plate)} />
            </label>
            <label className="flex flex-col gap-y-2 flex-1 ">
              <span className="text-sm">شماره تماس</span>
              <CustomerDetail name={customer.phone} />
            </label>
          </div>
          <h1 className="text-slate-800 pt-3">فاکتور</h1>
          <div className="flex flex-col md:flex-row md:items-center p-2 text-slate-600 md:gap-x-8 gap-y-4">
            <label className="flex flex-col gap-y-2">
              <span className="text-sm">تاریخ</span>
              <CustomersInputs
                type={"text"}
                name={"date"}
                placeholder={"تاریخ"}
                formik={formik}
              />
            </label>
          </div>
          <h1 className="text-slate-600 pt-3 text-sm">شرح کالا</h1>
          <CustomerDesc formik={formik} />
          <h1 className="text-slate-800 pt-3">جمع</h1>
          <CustomerTotal
            remain={remain}
            totalPrice={totalPrice}
            setRemain={setRemain}
            setTotalPrice={setTotalPrice}
            formik={formik}
          />
          <div className="max-w-xs mx-auto">
            <button
              type="submit"
              className="p-2 bg-violet-100    text-center rounded-lg  w-full text-sm text-slate-700 mt-5  hover:ring-2 hover:ring-offset-2 hover:ring-violet-200 transition-all ease-in-out duration-300"
            >
              افزودن
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCustomerId;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { data } = await axios.get(
    `http://localhost:3000/api/designated/${query.addCustomerId}`
  );
  const { customer } = data;
  return {
    props: {
      customer,
    },
  };
}
