import { getUserApi } from "features/api/user/getUser";
import { useAppSelector } from "features/store";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const user = getUserApi.endpoints.getUser.useQueryState(null);
  const userState = useAppSelector((state) => state.userState.user);

  return !(user && userState) ? (
    <Navigate to="/Account/Login" replace={true} />
  ) : (
    <Outlet />
  );
}
