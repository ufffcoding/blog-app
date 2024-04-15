import { useEffect, useState } from "react";
import authService from "./appwrite/auth.js";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Navigation from "./components/header/Navigation";
import Footer from "./components/footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  ) : null;
}

export default App;
