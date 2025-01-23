import React from "react";
import { TimeLinePurchase } from "../../../components/layouts/admin/AppointmentsProducts/TimeLinePurchase";
import { CompletePurchase } from "../../../components/layouts/admin/AppointmentsProducts/CompletePurchase";

export default function CompleteOrder() {

  return (
    <div className="w-full">
        <TimeLinePurchase />
        <div className="flex justify-end">
        <CompletePurchase />
      </div>
    </div>
  );
}
