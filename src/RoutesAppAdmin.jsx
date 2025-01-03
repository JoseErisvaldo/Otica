import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Admin/Home";
import { ComplexNavbar } from "./components/layouts/admin/header";
import CategoryOfCuts from "./pages/Admin/Products";
import Clients from "./pages/Admin/Clients";
import DetailsClient from "./pages/Admin/DetailsClient";
import Doctor from "./pages/Admin/Doctor";
import DoctorDetails from "./pages/Admin/Doctor/DoctorDetails";
import Suppliers from "./pages/Admin/Suppliers";
import DetailsSupplier from "./pages/Admin/Suppliers/DetailsSupplier";
import Products from "./pages/Admin/Products";
import ProductDetails from "./pages/Admin/Products/ProductsDetails";
import EditProduct from "./pages/Admin/Products/EditPProduct";
import AppointmentsProducts from "./pages/Admin/AppointmentsProducts";
import AppointmentsProductsDetails from "./pages/Admin/AppointmentsProducts/AppointmentsProductsDetails";



export default function RoutesAppAdmin() {
  return (
    <BrowserRouter>
    <ComplexNavbar/>
      <Routes>
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/clientes" element={<Clients />} />
        <Route path="/admin/detalhescliente/:id" element={<DetailsClient />} />
        <Route path="/admin/medico" element={<Doctor />} />
        <Route path="/admin/detalhesmedico/:id" element={<DoctorDetails />} />
        <Route path="/admin/suppliers" element={<Suppliers />} />
        <Route path="/admin/detailsSupplier/:id" element={<DetailsSupplier />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/productsdetails/:id" element={<ProductDetails />} />
        <Route path="/admin/editproduct/:id" element={<EditProduct />} />

        <Route path="/admin/appointmentsProducts" element={<AppointmentsProducts />} />
        <Route path="/admin/detailsappointmentsproducts/:id" element={<AppointmentsProductsDetails />} />

      </Routes>
    </BrowserRouter>
  );
}
