import Layout from "../containers/layout";
import Link from "next/link";
import CustomerList from "../components/customer/customerList";
import { HiPlusSmall } from "react-icons/hi2";
import axios from "axios";
import Pagination from "../components/pagination/pagination";

const Home = ({ Customers }) => {
  return (
    <Layout>
      <h1 className="text-lg text-slate-700font-semibold">لیست مشتریان</h1>
      <div className=" h-[80vh] flex flex-col justify-between">
        <div className="grid grid-cols-12 pt-4 gap-6 md:gap-8 ">
          {Customers.docs.map((customer, index) => {
            return <CustomerList customer={customer} key={customer._id} />;
          })}
        </div>
        <div className="flex items-center justify-between relative">
          <Pagination customer={Customers} path={"/"} />
          <Link
            href="/addCustomer"
            className="flex  bottom-0 left-0 items-center hover:rotate-180  justify-center w-10 h-10 bg-violet-500 text-slate-100 rounded-full hover:ring hover:ring-violet-500 hover:ring-offset-2 transition-all ease-in-out duration-300"
          >
            <HiPlusSmall className="text-xl" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { query } = context;
  const page = query.page ? query.page : 0;
  const { data } = await axios.get(
    `http://localhost:3000/api/designated?page=${page}`
  );
  const { customers } = data;
  return {
    props: {
      Customers: customers,
    },
  };
}
