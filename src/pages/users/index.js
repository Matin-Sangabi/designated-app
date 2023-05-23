import axios from "axios";
import Pagination from "../../components/pagination/pagination";
import UserTable from "../../components/users/userTable";
import Layout from "../../containers/layout";
import http from "../../services/httpServices";

const Users = ({ customers }) => {
  return (
    <Layout>
      <h1>لیست مشتریان</h1>
      <div className=" mx-auto rounded-lg shadow-lg bg-white p-2 md:p-2 mt-4 flex flex-col justify-between  h-[40vh] md:h-[80vh]">
        <UserTable customers={customers.docs} />
        <div className="flex mt-10">
          <Pagination customer={customers} path={`/users`} />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
export async function getServerSideProps(context) {
  const { query } = context;
  const page = query.page ? query.page : 0;
  const { data } = await http.get(`/designated?page=${page}`);
  const { customers } = data;
  return {
    props: {
      customers,
    },
  };
}
