import { useAuth0 } from "@auth0/auth0-react";
import { Logout } from "@mui/icons-material";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="text-gray-500 font-medium text-sm mt-2 hover:text-gray-800">
     Sign out
    </button>
  );
};

export default LogoutButton;