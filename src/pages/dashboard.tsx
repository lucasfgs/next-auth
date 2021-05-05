import { AuthContext } from "contexts/AuthContext";
import { useCan } from "hooks/useCan";
import { useContext } from "react";
import { setupAPIClient } from "services/api";
import { withSSRAuthenticated } from "utils/auth/withSSRAuthenticated";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const userCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
    roles: ["administrator"],
  });
  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <h1>{userCanSeeMetrics && "Metrics"}</h1>
    </>
  );
}

export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  return {
    props: {},
  };
});
