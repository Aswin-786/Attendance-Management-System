import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Choose from "./pages/Choose";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StaffDashboard from "./components/StaffDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { RecoilRoot } from "recoil";
import InitUser from "./components/InitUser";
import Loading from "./components/Loading";

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
