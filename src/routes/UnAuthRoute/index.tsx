import FullScreenLoader from "components/FullScreenLoader";
import { getUserApi, useGetUserQuery } from "features/api/user/getUser";
import { useAppSelector } from "features/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function AuthRoute() {
  const user = getUserApi.endpoints.getUser.useQueryState(null);
  const userState = useAppSelector((state) => state.userState.user);

  return user && userState ? (
    <Navigate to="/Account/User" replace={true} />
  ) : (
    <Outlet />
  );
}
