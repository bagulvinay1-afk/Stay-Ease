import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddOwner from "./pages/admin/AddOwner";
import ViewOwners from "./pages/admin/ViewOwners";
import ViewPG from "./pages/admin/ViewPG";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddPG from "./pages/owner/AddPG";


import FindPG from "./pages/tenant/FindPG";

import ViewPGList from "./pages/owner/ViewPGList";
import AddTermsConditions from "./pages/owner/AddTermsConditions";
import EditRoom from "./pages/owner/EditRoom";
import EditPG from "./pages/owner/EditPG";
import AddRoom from "./pages/owner/AddRoom";
import PgDetails from "./pages/tenant/PgDetails";
import ConfirmStay from "./pages/tenant/ConfirmStay";
import PaymentPage from "./pages/tenant/PaymentPage";
import BookingSuccessPage from "./pages/tenant/BookingSuccessPage";
import TenantDashboard from "./pages/tenant/TenantDashboard";

/*  NEW: Layout to control Navbar */
function Layout() {
  const location = useLocation();

  // hide navbar on admin & owner routes
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/owner");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/findpg" element={<FindPG />} /> */}
        <Route path="/find-pg" element={<FindPG />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-owner" element={<AddOwner />} />
        <Route path="/admin/manage-owners" element={<ViewOwners />} />
        <Route path="/admin/manage-pg" element={<ViewPG />} />
       

        {/* Owner */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-pg" element={<AddPG />} />
         <Route path="/owner/ViewPGList" element={<ViewPGList />} />
         <Route path="/owner/edit-room/:id" element={<EditRoom />} />
         <Route path="/owner/edit-pg/:id" element={<EditPG />} />
         <Route path="/owner/add-room/:pgId" element={<AddRoom />} />
         <Route path="/owner/AddTermsConditions" element={<AddTermsConditions />} />
        <Route path="/add-pg" element={<ViewPG />} />

        {/* Tenant */}
        <Route
  path="/tenant/my-stay"
  element={< TenantDashboard/>}
/>

        <Route path="/tenant/find-pg" element={<FindPG />} />
        <Route path="/tenant/confirm-stay" element={<ConfirmStay />} />
        <Route path="/pg/:id" element={<PgDetails />} />
        <Route path="/tenant/payment" element={<PaymentPage />} />
         <Route
  path="/tenant/booking-success"
  element={<BookingSuccessPage />}
/>

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;