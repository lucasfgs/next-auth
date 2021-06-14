import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { validateUserPermissions } from "utils/auth/validateUserPermissions";

type useCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: useCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
