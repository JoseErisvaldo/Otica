import React from "react";
import { useParams } from "react-router-dom";
import DetailsDoctor from "../../../components/layouts/admin/Doctor/detailsDoctor";
import LayoutAdmin from "../../../layouts/Admin";
import NewSpecialty from "../../../components/layouts/admin/Doctor/NewSpecialty";
import ViewSpecialty from "../../../components/layouts/admin/Doctor/ViewSpecialty";
import DetailsSupplier from "../../../components/layouts/admin/Supplers/DetailsSupplers";


export default function SupplierDetails() {
  const { id } = useParams(); 

  return (
    <LayoutAdmin>
        <DetailsSupplier supplier_id={id}/>
        <div className="mt-3 flex justify-end">
            
        </div>
        <div>
            Listar produtos
        </div>
    </LayoutAdmin>
  );
}
