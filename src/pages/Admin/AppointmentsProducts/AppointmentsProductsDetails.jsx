import React from "react";
import { useParams } from "react-router-dom";
import DetailsAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/DetailsAppointmentsProducts";
import { CartProductsAppointments } from "../../../components/layouts/admin/AppointmentsProducts/CartProductsAppointments";

export default function AppointmentsProductsDetails() {
  const { id } = useParams(); 

  return (
    <div className="w-full">
      <DetailsAppointmentsProducts id={id} />
      <div className="flex justify-end">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white fixed bottom-10 cursor-pointer">
          <CartProductsAppointments />
        </div>
      </div>
    </div>
  );
}
