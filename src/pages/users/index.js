import axios from "axios";
import UserTable from "../../components/users/userTable";
import Layout from "../../containers/layout";

const Users = ({ Customers }) => {
  return (
    <Layout>
      <h1>لیست مشتریان</h1>
      <div className=" mx-auto rounded-lg shadow-lg bg-white p-2 md:p-2 mt-4">
        <UserTable customers={Customers} />
      </div>
    </Layout>
  );
};

export default Users;
export async function getServerSideProps(context) {
  const { data } = await axios.get("http://localhost:3000/api/designated");
  const { Customers } = data;
  return {
    props: {
      Customers,
    },
  };
}
