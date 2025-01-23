import LayoutAdmin from "../../../layouts/Admin";
import NewSupplier from "../../../components/layouts/admin/Supplers/NewSupplier";
import ViewSupplier from "../../../components/layouts/admin/Supplers/ViewSupplier";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";


export default function Suppliers () { 
  return(
    <div className="w-full">
      <div className="flex justify-end flex-wrap items-end w-full gap-3">
        <DrawerRight>
          <NewSupplier />
        </DrawerRight>
      </div>
      <div className="w-full">
        <ViewSupplier />
      </div>
    </div>
  )
}