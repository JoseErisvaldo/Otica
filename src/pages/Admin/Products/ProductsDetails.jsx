import React from "react";
import { useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import ProductsDetails from "../../../components/layouts/admin/Products/ProductsDetails";


export default function DoctorDetails() {
  const { id } = useParams(); 

  return (
    <LayoutAdmin>
      <div className="mt-3 flex justify-end">
        Cadastrar XXXX
      </div>
      <div>
        <ProductsDetails />
      </div>
    </LayoutAdmin>
  );
}
