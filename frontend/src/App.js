import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Loading from "./components/Loading";
import { RecoilRoot } from "recoil";
import InitUser from "./components/InitUser";

const Home = lazy(() => import("./pages/Home"));
const Choose = lazy(() => import("./pages/Choose"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const StaffDashboard = lazy(() => import("./components/StaffDashboard"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function App() {
  return (
    <>
      <RecoilRoot>
        <InitUser />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={"/register"} element={<Choose />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register/admin"} element={<Register />} />
              <Route path={"/register/staff"} element={<Register />} />
              <Route path={"/staff/dashboard"} element={<StaffDashboard />} />
              <Route path={"/admin/dashboard"} element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </RecoilRoot>
    </>
  );
}

export default App;
