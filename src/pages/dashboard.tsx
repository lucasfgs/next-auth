import { Can } from "components/Can";
import { AuthContext } from "contexts/AuthContext";
import { useCan } from "hooks/useCan";
import { useContext } from "react";
import { setupAPIClient } from "services/api";
import { withSSRAuthenticated } from "utils/auth/withSSRAuthenticated";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const userCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
    roles: ["administrator"],
  });
  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>
      <h1>{userCanSeeMetrics && "Metrics"}</h1>
      <Can permissions={["metrics.list"]}>
        <h1>Metrics</h1>
      </Can>
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
