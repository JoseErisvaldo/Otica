
import NewAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/NewAppointments";
import ViewAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/ViewAppontiments";
import LayoutAdmin from "../../../layouts/Admin";

export default function AppointmentsProducts () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <NewAppointmentsProducts />
      </div>
      <div>
        <ViewAppointmentsProducts />
      </div>
    </LayoutAdmin>
  )
}