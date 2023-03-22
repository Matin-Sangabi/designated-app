import { useState } from "react";
import CustomerDesc from "../../components/customer/customerDesc";
import CustomersInputs from "../../components/customer/customerForms";
import CustomerTotal from "../../components/customer/customerTotla";
import Layout from "../../containers/layout";
import { format } from "../../utils/formatNumber";
const AddCustomer = () => {
  return (
    <Layout>
      <h1 className="text-lg text-slate-700 font-semibold p-2">افزودن مشتری</h1>
      <div className="pt-5 mx-auto max-w-screen-xl bg-white shadow-md rounded-xl flex flex-col gap-y-4 px-2 py-4">
        <form className="">
          <h1 className="text-slate-800  ">مشخصات مشتری</h1>
          <div className="flex flex-col md:flex-row md:items-center p-2 text-slate-600 md:gap-x-8 gap-y-4">
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">نام مشتری</span>
              <CustomersInputs
                type={"text"}
                name={"name"}
                placeholder={"نام مشتری"}
              />
            </label>
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">شماره پلاک</span>
              <CustomersInputs
                type={"text"}
                name={"plate"}
                placeholder={"شماره پلاک"}
              />
            </label>
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">شماره تماس</span>
              <CustomersInputs
                type={"text"}
                name={"phone"}
                placeholder={"شماره مشتری"}
              />
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
              />
            </label>
          </div>
          <h1 className="text-slate-600 pt-3 text-sm">شرح کالا</h1>
          <CustomerDesc />
          <h1 className="text-slate-800 pt-3">جمع</h1>
          <CustomerTotal />
        </form>
      </div>
    </Layout>
  );
};

export default AddCustomer;
