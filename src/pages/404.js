import Layout from "../layout/layout";

const NotFoundPage = () => {
    return ( 
        <Layout>
            <div className="w-full h-96 flex justify-center items-center">
                <h1 className="text-5xl font-bold">404</h1>
                <h1 className="text-3xl font-semibold">صفحه مورد نظر پیدا نشد .</h1>
            </div>

        </Layout>
     );
}
 
export default NotFoundPage;