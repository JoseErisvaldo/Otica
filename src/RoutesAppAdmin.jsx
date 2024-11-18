import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Admin/Home";
import { ComplexNavbar } from "./components/layouts/admin/header";
import CategoryOfCuts from "./pages/Admin/CategoryOfCuts";
import Clients from "./pages/Admin/Clients";
import DetailsClient from "./pages/Admin/DetailsClient";
import Doctor from "./pages/Admin/Doctor";
import DoctorDetails from "./pages/Admin/Doctor/DoctorDetails";



export default function RoutesAppAdmin() {
  return (
    <BrowserRouter>
    <ComplexNavbar/>
      <Routes>
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/categoria" element={<CategoryOfCuts />} />
        <Route path="/admin/clientes" element={<Clients />} />
        <Route path="/admin/detalhescliente/:id" element={<DetailsClient />} />
        <Route path="/admin/medico" element={<Doctor />} />
        <Route path="/admin/detalhesmedico/:id" element={<DoctorDetails />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}
