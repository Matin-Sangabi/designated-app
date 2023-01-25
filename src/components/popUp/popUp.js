import { useDispatch } from "react-redux";
import { DeleteDesignatedFactor, deleteDesignatedSalesInVoices } from "../../redux/designated/designatedSlice";
const PopUp = ({ designated, setIsOpen, id }) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    if (Number(designated.remaining) !== 0) {
      alert("شما نمیتوانید این آیتم را پاک کنید زیرا  هنوز بده کار میباشد.");
      setIsOpen(false);
    } else {
      // const designatedId = id;
      const salesInVoicesId = designated.id;
      dispatch(
        DeleteDesignatedFactor({id , uid : salesInVoicesId})
      );
      setIsOpen(false);
    }
  };
  return (
    <div className="fixed w-full h-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-xl flex flex-col">
        <div className="flex flex-col text-slate-800  gap-y-2">
          <h1>آیا مطمئن هستید که میخواهید این اطلاعات : </h1>
          <p className="">
            در تاریخ : {new Date(designated.createdAt).toLocaleDateString("fa")}
          </p>
          <p>شرح بابت : {designated.desc[0].title} ...</p>
          <p>مانده حساب : {Number(designated.remaining).toLocaleString("")}</p>
          <h1 className="text-lg text-slate-800"> را حذف کنید ؟</h1>
        </div>
        <div className="flex items-center w-full gap-x-2">
          <button
            onClick={deleteHandler}
            className="rounded-md flex-1 ring-slate-800 ring-2  py-2 hover:ring-2 hover:ring-offset-2 hover:ring-slate-800 transition-all ease-in-out duration-500"
          >
            بله
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#198278] flex-auto text-slate-100 py-2 rounded-md hover:ring-2 hover:ring-offset-2 hover:ring-[#198278] transition-all ease-in-out duration-500"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
