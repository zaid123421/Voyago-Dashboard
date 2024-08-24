import { useContext } from "react";
import { User } from "../Context";
import { Navigate, Outlet } from "react-router";

export default function RequireAuth(){
  const userInfo = useContext(User);
  return userInfo.auth.userAccessToken ? <Outlet /> : <Navigate to = '/'/>
}