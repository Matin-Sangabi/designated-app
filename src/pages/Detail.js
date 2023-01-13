import { Link } from "react-router-dom";
import Detail from "../components/DetailPage/Detail";
import { HiPrinter } from "react-icons/hi2";


const DetailPAge = () => {

 
  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-10">
      <div className="flex items-center justify-between pb-4">
        <Link to="/" className="text-sm px-6 text-sky-700 print:hidden">
          بازگشت به خانه{" "}
        </Link>
        <button className="print:hidden text-lg bg-[#198278] p-2 rounded-md text-slate-200" onClick={() => window.print()}><HiPrinter/></button>
        
      </div>
      <Detail />
    </div>
  );
};

export default DetailPAge;
