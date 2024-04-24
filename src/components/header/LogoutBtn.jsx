import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { emptyPosts } from "../../store/postSlice";

function LogoutBtn({ className, ...props }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(emptyPosts());
    });
  };
  return (
    <button
      className={`${className}`}
      type="button"
      {...props}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
