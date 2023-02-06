import { Link } from "react-router-dom";
import Detail from "../components/DetailPage/Detail";
import { HiPrinter } from "react-icons/hi2";
import Layout from "../layout/layout";

const DetailPAge = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-screen-xl px-4 pt-10">
        <div className="flex items-center justify-between pb-4">
          <button
            className="print:hidden text-lg bg-primary p-2 rounded-md text-silver"
            onClick={() => window.print()}
          >
            <HiPrinter />
          </button>
          <Link to="/" className="text-sm px-20 text-primary print:hidden">
            بازگشت به خانه{" "}
          </Link>
        </div>
        <Detail />
      </div>
    </Layout>
  );
};

export default DetailPAge;
