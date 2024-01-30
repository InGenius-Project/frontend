import { useAppSelector } from "features/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRole } from "types/DTO/UserDTO";

const InternalUserRoute = () => {
  const userRole = useAppSelector((state) => state.userState.User?.Role);
  const location = useLocation();
  const from =
    ((location.state as any)?.from.pathname as string) || "/Account/User";

  if (userRole === UserRole.InternalUser || userRole === UserRole.Admin) {
    return <Outlet />;
  } else {
    toast.warn("您沒有權限訪問此頁面");
    return <Navigate to={from} replace={true} />;
  }
};

export default InternalUserRoute;
