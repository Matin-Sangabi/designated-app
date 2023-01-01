const Homepage = () => {
    return ( 
        <div className="max-w-screen-xl mx-auto container relative h-screen">
            <div className="w-full flex items-center justify-between pt-10">
                <input type="search" placeholder="جستجو" className="p-2 rounded-md border-none outline-none ring-1 focus:ring-offset-2 ring-gray-500 transition-all ease-in-out duration-500" /> 
                <div className="p-2">مرتب سازی</div>
            </div>
            <div className="grid grid-cols-12 pt-6 gap-6">
                <div className="col-span-6 py-4 px-2 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-[#bfeaf5] transition-all ease-in-out duration-300 bg-[#BFEAF5] rounded-md shadow-md text-[#0A2647] flex flex-col">
                    <div className="flex items-center gap-x-2 justify-between">
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> نام :متین اسدسنگابی</h1>
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> شماره پلاک : #</h1>
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> تلفن :09178694033</h1>
                    </div>
                </div>
                <div className="col-span-6 py-4 px-2 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-[#bfeaf5] transition-all ease-in-out duration-300 bg-[#BFEAF5] rounded-md shadow-md text-[#0A2647] flex flex-col">
                    <div className="flex items-center gap-x-2 justify-between">
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> نام :متین اسدسنگابی</h1>
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> شماره پلاک : #</h1>
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> تلفن :09178694033</h1>
                    </div>
                </div>
                <div className="col-span-6 py-4 px-2 hover:ring hover:ring-offset-2 cursor-pointer hover:ring-[#bfeaf5] transition-all ease-in-out duration-300 bg-[#BFEAF5] rounded-md shadow-md text-[#0A2647] flex flex-col">
                    <div className="flex items-center gap-x-2 justify-between">
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> نام :متین اسدسنگابی</h1>
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> شماره پلاک : #</h1>
                        <h1 className="font-semibold hover:text-[#205295] transition-all ease-in-out duration-300 "> تلفن :09178694033</h1>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-10 left-2">
                <button className="p-2 rounded-md bg-[#82AAE3] text-[#0A2647] font-semibold hover:ring hover:ring-offset-2 hover:ring-[#82aae3] transition-all ease-in-out duration-300 hover:text-gray-100">اضافه کردن </button>
            </div>
        </div>
     );
}
 
export default Homepage;