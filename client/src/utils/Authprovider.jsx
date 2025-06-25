import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Authprovider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // use `null` to represent "loading" state

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token found:", token);

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    // Loading spinner or blank state while checking
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default Authprovider;
