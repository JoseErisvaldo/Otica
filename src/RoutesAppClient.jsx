import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Admin/Home";
import Auth from "./pages/Auth";
import { ComplexNavbar } from "./components/layouts/admin/header";


export default function RoutesApp() {
  return (
    <BrowserRouter>
    <ComplexNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}
