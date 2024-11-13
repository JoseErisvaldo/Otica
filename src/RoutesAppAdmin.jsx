import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Admin/Home";
import Auth from "./pages/Auth";
import { ComplexNavbar } from "./components/layouts/admin/header";
import CategoryOfCuts from "./pages/Admin/CategoryOfCuts";


export default function RoutesAppAdmin() {
  return (
    <BrowserRouter>
    <ComplexNavbar/>
      <Routes>
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/categoriacorte" element={<CategoryOfCuts />} />
      </Routes>
    </BrowserRouter>
  );
}
