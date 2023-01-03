import { createElement, useRef } from "react";
function generateElement() {
    
    return createElement(
        'div' , 
        {className : 'bg-red-500'},
        
    )
  }
const AddUserPage = () => {
  const parentElement = useRef();

  
  return (
    <div className="container mx-auto max-w-screen-xl pt-10">
      <form className="w-full p-2 rounded-md ring ring-gray-500">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-x-2">
              نام :
              <input
                type="text"
                placeholder="نام"
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
            <label className="flex items-center gap-x-2">
              تلفن :
              <input
                type="tel"
                placeholder="تلفن"
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
            <label className="flex items-center gap-x-2">
              پلاک :
              <input
                type="text"
                placeholder="پلاک"
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
          </div>
          <div className="">
            <label className="flex items-center gap-x-2">
              تاریخ :
              <input
                type="text"
                placeholder="نام"
                className="p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </label>
          </div>
          <div className="flex flex-col gap-y-2 relative" ref={parentElement}>
            <h1>شرح کار : </h1>
            <div className="flex items-center justify-between gap-x-2 w-full relative">
              <textarea
                placeholder="شرح کالا 1"
                className="h-10 resize-none rounded-md p-2 bg-gray-100 flex-1 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              ></textarea>
              <input
                type="text"
                placeholder="قیمت"
                className=" h-10 px-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </div>
            <div className="flex items-center justify-between gap-x-2 w-full relative">
              <textarea
                placeholder="شرح کالا 1"
                className="h-10 resize-none rounded-md p-2 bg-gray-100 flex-1 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              ></textarea>
              <input
                type="text"
                placeholder="قیمت"
                className=" h-10 px-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </div>
            {<Element />}
            <button
              type="button"
              onClick={generateElement}
              className="w-6 h-6 rounded-full bg-[#178278] text-gray-100 absolute left-0 -bottom-3"
            >
              +
            </button>
          </div>
          <div className="flex flex-col gap-y-4 pt-4">
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">جمع کل : </h1>
              <div className="p-2 block bg-gray-100 w-36 h-10 rounded-md">
                100,000,000 ريال
              </div>
            </div>
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">پرداختی : </h1>
              <input
                type="text"
                placeholder="پرداختی"
                className="p-1 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
              />
            </div>
            <div className="flex items-center gap-x-2 ">
              <h1 className="text-lg font-semibold">مانده : </h1>
              <div className="p-2 block bg-gray-100 w-36 h-10 rounded-md">
                100,000 ريال
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="p-1 pt-4 bg-[#178278] text-gray-100 rounded-md w-72 hover:ring hover:ring-[#178278] hover:ring-offset-2 transition-all ease-in-out duration-300"
          >
            افزودن
          </button>
        </div>
      </form>
    </div>
  );
};

function Element () {
    console.log('run');
    return createElement(
        generateElement
    )
}

export default AddUserPage;
/*https://stackoverflow.com/questions/57000027/how-to-create-element-on-button-click*/
