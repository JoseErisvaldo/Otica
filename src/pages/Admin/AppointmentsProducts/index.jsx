
import NewAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/NewAppointments";
import ViewAppointmentsProducts from "../../../components/layouts/admin/AppointmentsProducts/ViewAppontiments";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";
import LayoutAdmin from "../../../layouts/Admin";

export default function AppointmentsProducts () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end flex-wrap items-end w-full gap-3">
        <DrawerRight>
          <NewAppointmentsProducts />
        </DrawerRight>
      </div>
      <div className="w-full">
        <ViewAppointmentsProducts />
      </div>
    </LayoutAdmin>
  ) 
}