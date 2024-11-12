import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Admin/Home";
import Auth from "./pages/Auth";


export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
