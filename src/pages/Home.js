const Homepage = () => {
    return ( 
        <div className="max-w-screen-xl mx-auto container" >
            <div className="w-full flex items-center justify-between pt-10">
                <input type="search" placeholder="جستجو" className="p-2 rounded-md border-none outline-none ring-1 focus:ring-offset-2 ring-gray-500 transition-all ease-in-out duration-500" /> 
                <div className="p-2">مرتب سازی</div>
            </div>
        </div>
     );
}
 
export default Homepage;