import { getUserApi } from "features/api/user/getUser";
import { useAppSelector } from "features/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRoute() {
  const user = getUserApi.endpoints.getUser.useQueryState(null);
  const userState = useAppSelector((state) => state.userState.User);
  const location = useLocation();

  return !(user && userState) ? (
    <Navigate to="/Account/Login" replace={true} state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
