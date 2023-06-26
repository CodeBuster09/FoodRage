import React, { useContext } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import PageNotFound from "../PageNotFound";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useContext(GlobalContex);
  const isAuthenticated = Object.keys(userData).length > 0;
  const isAdmin = Object.keys(userData).length > 0 && userData.role === "ADMIN";
  const isDonor = Object.keys(userData).length > 0 && userData.role === "DONOR";
  const isAgent = Object.keys(userData).length > 0 && userData.role === "AGENT";

  const currentRoute = location.pathname.split("/")[1];
  const adminRouts = [
    "donations",
    "agents",
    "donors",
    "add_agent",
    "profile",
    "requests"
  ];

  const agentRoutes = ["donations", "assigned", "profile"];
  const donorRoutes = ["donations", "donate", "status", "profile"];
  if (!isAuthenticated) {
    return navigate("/");
  }

  if (isAuthenticated && isAdmin && adminRouts.includes(currentRoute)) {
    // for admin
    return <Outlet />;
  } else if (isAuthenticated && isAgent && agentRoutes.includes(currentRoute)) {
    // fot agent
    return <Outlet />;
  } else if (isAuthenticated && isDonor && donorRoutes.includes(currentRoute)) {
    // for donor
    return <Outlet />;
  } else {
    return <PageNotFound />;
  }
}

export default ProtectedRoutes;
