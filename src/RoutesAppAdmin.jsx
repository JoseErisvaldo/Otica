import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleAppointment from "./pages/Admin/ScheduleAppointment";
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
import CompleteOrder from "./pages/Admin/AppointmentsProducts/CompleteOrder";
import ViewAppointmentProducts from "./pages/Admin/AppointmentsProducts/ViewAppointmentProducts";
import StockMovements from "./pages/Admin/StockMovements";
import CheckoutProducts from "./pages/Admin/CheckoutProducts";
import StockProducts from "./pages/Admin/StockProducts";
import Dashboard from "./pages/Admin/Dashboard";
import LayoutAdmin from "./layouts/Admin";
import Sidebar from "./components/layouts/admin/SideBar";


export default function RoutesAppAdmin() {
  return (
    <BrowserRouter>
      <Sidebar/>
    <div className="flex  p-4 md:ml-64">
    <LayoutAdmin >
      
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/scheduleappointment" element={<ScheduleAppointment />} />
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
        <Route path="/admin/completeorder" element={<CompleteOrder />} />
        <Route path="/admin/viewpppointmentproducts/:id" element={<ViewAppointmentProducts />} />

        <Route path="/admin/stockmovements" element={<StockMovements />} />

        <Route path="/admin/checkout" element={<CheckoutProducts />} /> 

        <Route path="/admin/stockproducts" element={<StockProducts />} />
      </Routes> 
      </LayoutAdmin>
      </div>
    </BrowserRouter>
  );
}
