const Homepage = () => {
    return ( 
        <div className="max-w-screen-xl mx-auto container">
            <div className="w-full flex items-center justify-between pt-10">
                <input type="search" placeholder="جستجو" className="p-2 rounded-md border-none outline-none ring-1 focus:ring-offset-2 ring-gray-500 transition-all ease-in-out duration-500" /> 
                <div className="p-2">مرتب سازی</div>
            </div>
            <div className="grid grid-cols-12 pt-6 gap-6">
                <div className="col-span-6 py-4 px-2 bg-[#BFEAF5] rounded-md shadow-md text-[#0A2647] flex flex-col">
                    <div className="flex items-center gap-x-2 justify-between">
                        <h1 className="font-semibold"> نام :متین اسدسنگابی</h1>
                        <h1 className="font-semibold"> شماره پلاک : #</h1>
                        <h1 className="font-semibold"> تلفن :09178694033</h1>
                    </div>
                </div>
                <div className="col-span-6 py-4 px-2 bg-[#BFEAF5] rounded-md shadow-md text-[#0A2647] flex flex-col">
                    <div className="flex items-center gap-x-2 justify-between">
                        <h1 className="font-semibold"> نام :متین اسدسنگابی</h1>
                        <h1 className="font-semibold"> شماره پلاک : #</h1>
                        <h1 className="font-semibold"> تلفن :09178694033</h1>
                    </div>
                </div>
                <div className="col-span-6 py-4 px-2 bg-[#BFEAF5] rounded-md shadow-md text-[#0A2647] flex flex-col">
                    <div className="flex items-center gap-x-2 justify-between">
                        <h1 className="font-semibold"> نام :متین اسدسنگابی</h1>
                        <h1 className="font-semibold"> شماره پلاک : #</h1>
                        <h1 className="font-semibold"> تلفن :09178694033</h1>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Homepage;