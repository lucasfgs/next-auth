import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { setupAPIClient } from "services/api";
import { withSSRAuthenticated } from "utils/auth/withSSRAuthenticated";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return <h1>Dashboard: {user?.email}</h1>;
}

export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  return {
    props: {},
  };
});
