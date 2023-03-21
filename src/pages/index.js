import Layout from "../containers/layout";
import Link from "next/link";
import CustomerList from "../components/customer/customerList";

const Home = () => {
  return (
    <Layout>
      <h1 className="text-lg text-slate-700font-semibold">لیست مشتریان</h1>
      <div className="grid grid-cols-12 pt-4 gap-6 md:gap-8">
        {[1,2,3,4,5,6].map((item , index) => {
          return (
            <CustomerList key={index} />
          )
        })}
      </div>
      <div className="fixed left-52 bottom-4 ">
        <Link
          href="/AddCustomer"
          className="flex items-center justify-center w-10 h-10 bg-violet-500 text-slate-100 rounded-full hover:ring hover:ring-violet-500 hover:ring-offset-2 transition-all ease-in-out duration-300"
        >
          +
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
