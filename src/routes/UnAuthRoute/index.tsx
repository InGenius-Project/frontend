import { getUserApi } from "features/api/user/getUser";
import { useAppSelector } from "features/store";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRoute() {
  const user = getUserApi.endpoints.getUser.useQueryState(null);
  const userState = useAppSelector((state) => state.userState.User);
  const location = useLocation();
  const from =
    ((location.state as any)?.from.pathname as string) || "/Account/User";
  return user && userState ? (
    <Navigate to={from} replace={true} state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
