import { useCurrentToken } from "@/redux/features/auth/authApi";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import verifyJwt from "@/utils/verifyJwt";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  let user;
  if (token) {
    user = verifyJwt(token) as TUser;
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
