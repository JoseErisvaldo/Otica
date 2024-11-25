import React from "react";
import { useParams } from "react-router-dom";
import DetailsDoctor from "../../../components/layouts/admin/Doctor/detailsDoctor";
import LayoutAdmin from "../../../layouts/Admin";
import NewSpecialty from "../../../components/layouts/admin/Doctor/NewSpecialty";
import ViewSpecialty from "../../../components/layouts/admin/Doctor/ViewSpecialty";


export default function DoctorDetails() {
  const { id } = useParams(); 

  return (
    <LayoutAdmin>
      <DetailsDoctor doctor_id={id} />
      <div className="mt-3 flex justify-end">
        <NewSpecialty doctor_id={id}/>
      </div>
      <div>
        <ViewSpecialty doctor_id={id}/>
      </div>
    </LayoutAdmin>
  );
}
