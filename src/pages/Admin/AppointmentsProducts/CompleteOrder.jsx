import React from "react";
import LayoutAdmin from "../../../layouts/Admin";   
import { TimeLinePurchase } from "../../../components/layouts/admin/AppointmentsProducts/TimeLinePurchase";
import { CompletePurchase } from "../../../components/layouts/admin/AppointmentsProducts/CompletePurchase";

export default function CompleteOrder() {

  return (
    <LayoutAdmin>
        <TimeLinePurchase />
        <div className="flex justify-end">
        <CompletePurchase />
      </div>
    </LayoutAdmin>
  );
}
