
import NewAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/NewAppointments";
import ViewAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/ViewAppontiments";

export default function AppointmentsProducts () { 
  return(
    <div className="w-full">
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <NewAppointmentsProducts />
      </div>
      <div>
        <ViewAppointmentsProducts />
      </div>
    </div>
  ) 
}