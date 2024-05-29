import { useAppSelector } from '@/features/store';
import { UserRole } from '@/types/enums/UserRole';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CompanyUserRoute = () => {
  const userRole = useAppSelector((state) => state.userState.User?.Role);
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/Account/User';

  if (userRole === UserRole.Company) {
    return <Outlet />;
  } else {
    return <Navigate to={from} replace={true} />;
  }
};

export default CompanyUserRoute;
