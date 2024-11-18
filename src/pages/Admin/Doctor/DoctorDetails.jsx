import React from "react";
import { useParams } from "react-router-dom";
import DetailsDoctor from "../../../components/layouts/admin/Doctor/detailsDoctor";

export default function DoctorDetails() {
  const { id } = useParams(); 

  return (
    <>
      <DetailsDoctor doctor_id={id} />
    </>
  );
}
