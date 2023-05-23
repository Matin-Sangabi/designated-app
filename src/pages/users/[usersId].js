import Layout from "../../containers/layout";
import { useFormik } from "formik";
import CustomersInputs from "../../components/customer/customerForms";
import { toast } from "react-toastify";
import PlateForm from "../../components/plateForm/Plateform";
import { useRouter } from "next/router";
import http from "../../services/httpServices";

const UsersId = ({ customer }) => {
  const router = useRouter();
  const initialValues = {
    name: customer.name,
    plate: customer.plate,
    phone: customer.phone,
  };
  const onSubmit = async (values) => {
    const value = { ...values };
    const { data } = await http.put(`/designated/${customer._id}`, {
      value,
    });
    toast.success(data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
    router.push("/users");
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <Layout>
      <h1 className="text-slate-800">ویرایش مشخصات مشتری</h1>
      <div className="max-w-screen-xl p-4 bg-white rounded-xl shadow-xl mx-auto mt-4">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-slate-800  ">مشخصات مشتری</h1>
          <div className="flex flex-col p-2 text-slate-600 md:gap-x-8 gap-y-4 mt-4">
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">نام مشتری</span>
              <CustomersInputs
                type={"text"}
                name={"name"}
                placeholder={"نام مشتری"}
                formik={formik}
              />
            </label>
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">شماره پلاک</span>
              {/* <CustomersInputs
                type={"text"}
                name={"plate"}
                placeholder={"شماره پلاک"}
                formik={formik}
              /> */}
              <PlateForm plate={JSON.parse(customer.plate)} formik={formik} />
            </label>
            <label className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">شماره تماس</span>
              <CustomersInputs
                type={"text"}
                name={"phone"}
                placeholder={"شماره مشتری"}
                formik={formik}
              />
            </label>
          </div>
          <button
            type="submit"
            className="p-1  bg-violet-200 text-slate-700 rounded-lg w-full mt-4 hover:bg-violet-500 hover:ring-2 hover:ring-offset-2 hover:ring-violet-500  hover:text-slate-200 transition-all ease-in-out duration-300"
          >
            ویرایش
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UsersId;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { data } = await http.get(`/designated/${query.usersId}`);
  return {
    props: {
      customer: data.customer.docs,
    },
  };
}
