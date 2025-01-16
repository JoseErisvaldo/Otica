import React from "react";
import LayoutAdmin from "../../../layouts/Admin";   
import { useParams } from "react-router-dom";
import ViewAppointmentProductsDetails from "../../../components/layouts/admin/AppointmentsProducts/ViewAppointmentProductsDetails";

export default function ViewAppointmentProducts() {
    const { id } = useParams();

    return (
    <LayoutAdmin>
        <ViewAppointmentProductsDetails id={id} />
    </LayoutAdmin>
  );
}
